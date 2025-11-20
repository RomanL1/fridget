package ch.fridget.fridget.api;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import ch.fridget.fridget.domain.db.InventoryItem;
import ch.fridget.fridget.domain.db.Product;
import ch.fridget.fridget.domain.db.User;
import ch.fridget.fridget.domain.dto.api.CreateOrUpdateInventoryItemRequestDto;
import ch.fridget.fridget.domain.dto.api.CreateOrUpdateInventoryItemResponseDto;
import ch.fridget.fridget.repository.InventoryItemRepository;
import ch.fridget.fridget.repository.ProductRepository;
import ch.fridget.fridget.repository.UserRepository;
import ch.fridget.fridget.service.ProductInfoService;

@ExtendWith( MockitoExtension.class )
@DisplayName( "CreateInventoryItemController Tests" )
class ScanProductScenariosTest
{
	@Mock
	private ProductRepository productRepository;

	@Mock
	private InventoryItemRepository inventoryItemRepository;

	@Mock
	private UserRepository userRepository;

	@Mock
	private ProductInfoService productInfoService;

	@InjectMocks
	private InventoryItemController inventoryItemController;

	@InjectMocks
	private ScanProductController scanProductController;

	private User testUser;
	private String testUserCode;

	@BeforeEach
	void setUp ()
	{
		testUserCode = "TEST_USER_CODE";
		testUser = User.builder()
				.id( UUID.randomUUID() )
				.userCode( testUserCode )
				.build();
	}

	@Test
	@DisplayName( "Should create inventory item when product already exists (autocomplete scenario)" )
	void shouldCreateInventoryItemWhenProductExists ()
	{
		// Given - Product already exists in database
		UUID existingProductId = UUID.randomUUID();
		Product existingProduct = Product.builder()
				.id( existingProductId )
				.name( "Coca Cola" )
				.brandName( "Coca Cola Company" )
				.ean13( "5449000000996" )
				.quantity( "330ml" )
				.imageUrl( "https://example.com/cocacola.jpg" )
				.manuallyAddedByUser( false )
				.incomplete( false )
				.build();

		String bestBeforeDate = "2025-12-31T23:59:59Z";
		CreateOrUpdateInventoryItemRequestDto requestDto = CreateOrUpdateInventoryItemRequestDto.builder()
				.productId( existingProductId.toString() )
				.productName(  "Coca Cola" )
				.quantity( "1" )
				.bestBefore( bestBeforeDate )
				.build();

		UUID inventoryItemId = UUID.randomUUID();
		InventoryItem savedInventoryItem = InventoryItem.builder()
				.id( inventoryItemId )
				.user( testUser )
				.product( existingProduct )
				.productName( existingProduct.getName() )
				.brandName( existingProduct.getBrandName() )
				.quantity( existingProduct.getQuantity() )
				.bestBeforeDate( Instant.parse( bestBeforeDate ) )
				.storedInFridge( true )
				.opened( false )
				.dateAddedAt( Instant.now() )
				.build();

		when( userRepository.findUserByUserCode( testUserCode ) ).thenReturn( Optional.of( testUser ) );
		when( productRepository.findById( existingProductId ) ).thenReturn( Optional.of( existingProduct ) );
		when( inventoryItemRepository.save( any( InventoryItem.class ) ) ).thenReturn( savedInventoryItem );

		// When
		ResponseEntity<CreateOrUpdateInventoryItemResponseDto> response = inventoryItemController.createOrUpdateInventoryItem( testUserCode, requestDto );

		// Then
		assertThat( response.getStatusCode() ).isEqualTo( HttpStatus.OK );
		assertThat( response.getBody() ).isNotNull();
		assertThat( response.getBody().getInventoryItemId() ).isEqualTo( inventoryItemId.toString() );
		assertThat( response.getBody().getProductName() ).isEqualTo( "Coca Cola" );
		assertThat( response.getBody().getBrandName() ).isEqualTo( "Coca Cola Company" );
		assertThat( response.getBody().getQuantity() ).isEqualTo( "330ml" );
		assertThat( response.getBody().getImageUrl() ).isEqualTo( "https://example.com/cocacola.jpg" );
		assertThat( response.getBody().getBestBefore() ).isEqualTo( bestBeforeDate );

		// Verify product was not created/updated
		verify( productRepository, never() ).save( any( Product.class ) );
		// Verify inventory item was created
		verify( inventoryItemRepository, times( 1 ) ).save( any( InventoryItem.class ) );
	}

	@Test
	@DisplayName( "Should create new product and inventory item when product does not exist (manual add scenario)" )
	void shouldCreateProductAndInventoryItemWhenProductDoesNotExist ()
	{
		// Given - Product does not exist, user manually adds it
		CreateOrUpdateInventoryItemRequestDto requestDto = CreateOrUpdateInventoryItemRequestDto.builder()
				.productId( null ) // No product ID means new product
				.productName( "Custom Milk" )
				.brandName( "Local Farm" )
				.productBarcode( "1234567890123" )
				.imageUrl( "https://example.com/milk.jpg" )
				.quantity( "1L" )
				.bestBefore( "2025-11-15T00:00:00Z" )
				.build();

		UUID newProductId = UUID.randomUUID();
		Product newProduct = Product.builder()
				.id( newProductId )
				.name( "Custom Milk" )
				.brandName( "Local Farm" )
				.quantity( "1L" )
				.ean13( "1234567890123" )
				.imageUrl( "https://example.com/milk.jpg" )
				.manuallyAddedByUser( true )
				.build();

		UUID inventoryItemId = UUID.randomUUID();
		InventoryItem savedInventoryItem = InventoryItem.builder()
				.id( inventoryItemId )
				.user( testUser )
				.product( newProduct )
				.productName( newProduct.getName() )
				.brandName( newProduct.getBrandName() )
				.quantity( newProduct.getQuantity() )
				.bestBeforeDate( Instant.parse( "2025-11-15T00:00:00Z" ) )
				.storedInFridge( true )
				.opened( false )
				.dateAddedAt( Instant.now() )
				.build();

		when( userRepository.findUserByUserCode( testUserCode ) ).thenReturn( Optional.of( testUser ) );
		when( productRepository.save( any( Product.class ) ) ).thenReturn( newProduct );
		when( inventoryItemRepository.save( any( InventoryItem.class ) ) ).thenReturn( savedInventoryItem );

		// When
		ResponseEntity<CreateOrUpdateInventoryItemResponseDto> response = inventoryItemController.createOrUpdateInventoryItem( testUserCode, requestDto );

		// Then
		assertThat( response.getStatusCode() ).isEqualTo( HttpStatus.OK );
		assertThat( response.getBody() ).isNotNull();
		assertThat( response.getBody().getInventoryItemId() ).isEqualTo( inventoryItemId.toString() );
		assertThat( response.getBody().getProductName() ).isEqualTo( "Custom Milk" );
		assertThat( response.getBody().getBrandName() ).isEqualTo( "Local Farm" );
		assertThat( response.getBody().getQuantity() ).isEqualTo( "1L" );

		// Verify product was created
		ArgumentCaptor<Product> productCaptor = ArgumentCaptor.forClass( Product.class );
		verify( productRepository, times( 1 ) ).save( productCaptor.capture() );
		Product capturedProduct = productCaptor.getValue();
		assertThat( capturedProduct.getName() ).isEqualTo( "Custom Milk" );
		assertThat( capturedProduct.getBrandName() ).isEqualTo( "Local Farm" );
		assertThat( capturedProduct.isManuallyAddedByUser() ).isTrue();

		// Verify inventory item was created
		verify( inventoryItemRepository, times( 1 ) ).save( any( InventoryItem.class ) );
	}

	@Test
	@DisplayName( "Should complete incomplete product and create inventory item" )
	void shouldCompleteIncompleteProductAndCreateInventoryItem ()
	{
		// Given - Product exists but is incomplete, user provides complete information
		UUID incompleteProductId = UUID.randomUUID();
		Product incompleteProduct = Product.builder()
				.id( incompleteProductId )
				.name( null )
				.brandName( null )
				.ean13( "9876543210123" )
				.quantity( "UNKNOWN" )
				.incomplete( true )
				.manuallyAddedByUser( false )
				.build();

		CreateOrUpdateInventoryItemRequestDto requestDto = CreateOrUpdateInventoryItemRequestDto.builder()
				.productId( incompleteProductId.toString() )
				.productName( "Orange Juice" )
				.brandName( "Tropicana" )
				.imageUrl( "https://example.com/oj.jpg" )
				.quantity( "1L" )
				.bestBefore( "2025-11-30T00:00:00Z" )
				.build();

		Product completedProduct = Product.builder()
				.id( incompleteProductId )
				.name( "Orange Juice" )
				.brandName( "Tropicana" )
				.ean13( "9876543210123" )
				.quantity( "1L" )
				.imageUrl( "https://example.com/oj.jpg" )
				.incomplete( false )
				.manuallyAddedByUser( false )
				.build();

		UUID inventoryItemId = UUID.randomUUID();
		InventoryItem savedInventoryItem = InventoryItem.builder()
				.id( inventoryItemId )
				.user( testUser )
				.product( completedProduct )
				.productName( completedProduct.getName() )
				.brandName( completedProduct.getBrandName() )
				.quantity( completedProduct.getQuantity() )
				.bestBeforeDate( Instant.parse( "2025-11-30T00:00:00Z" ) )
				.storedInFridge( true )
				.opened( false )
				.dateAddedAt( Instant.now() )
				.build();

		when( userRepository.findUserByUserCode( testUserCode ) ).thenReturn( Optional.of( testUser ) );
		when( productRepository.findById( incompleteProductId ) ).thenReturn( Optional.of( incompleteProduct ) );
		when( productRepository.save( any( Product.class ) ) ).thenReturn( completedProduct );
		when( inventoryItemRepository.save( any( InventoryItem.class ) ) ).thenReturn( savedInventoryItem );

		// When
		ResponseEntity<CreateOrUpdateInventoryItemResponseDto> response = inventoryItemController.createOrUpdateInventoryItem( testUserCode, requestDto );

		// Then
		assertThat( response.getStatusCode() ).isEqualTo( HttpStatus.OK );
		assertThat( response.getBody() ).isNotNull();
		assertThat( response.getBody().getProductName() ).isEqualTo( "Orange Juice" );
		assertThat( response.getBody().getBrandName() ).isEqualTo( "Tropicana" );

		// Verify product was updated to complete
		ArgumentCaptor<Product> productCaptor = ArgumentCaptor.forClass( Product.class );
		verify( productRepository, times( 1 ) ).save( productCaptor.capture() );
		Product capturedProduct = productCaptor.getValue();
		assertThat( capturedProduct.isIncomplete() ).isFalse();
		assertThat( capturedProduct.getName() ).isEqualTo( "Orange Juice" );
		assertThat( capturedProduct.getBrandName() ).isEqualTo( "Tropicana" );

		// Verify inventory item was created
		verify( inventoryItemRepository, times( 1 ) ).save( any( InventoryItem.class ) );
	}

	@Test
	@DisplayName( "Should return bad request when productName is missing" )
	void shouldReturnBadRequestWhenProductNameIsMissing ()
	{
		// Given
		CreateOrUpdateInventoryItemRequestDto requestDto = CreateOrUpdateInventoryItemRequestDto.builder()
				.productName( null)
				.build();

		// When
		ResponseEntity<CreateOrUpdateInventoryItemResponseDto> response = inventoryItemController.createOrUpdateInventoryItem( testUserCode, requestDto );

		// Then
		assertThat( response.getStatusCode() ).isEqualTo( HttpStatus.BAD_REQUEST );
		verify( productRepository, never() ).save( any( Product.class ) );
		verify( inventoryItemRepository, never() ).save( any( InventoryItem.class ) );
	}

	@Test
	@DisplayName( "Should return bad request when productName is empty string" )
	void shouldReturnBadRequestWhenProductNameIsEmpty ()
	{
		// Given
		CreateOrUpdateInventoryItemRequestDto requestDto = CreateOrUpdateInventoryItemRequestDto.builder()
				.productName( "" )
				.build();

		// When
		ResponseEntity<CreateOrUpdateInventoryItemResponseDto> response = inventoryItemController.createOrUpdateInventoryItem( testUserCode, requestDto );

		// Then
		assertThat( response.getStatusCode() ).isEqualTo( HttpStatus.BAD_REQUEST );
		verify( productRepository, never() ).save( any( Product.class ) );
		verify( inventoryItemRepository, never() ).save( any( InventoryItem.class ) );
	}

	@Test
	@DisplayName( "Should throw exception when user code does not exist" )
	void shouldThrowExceptionWhenUserCodeDoesNotExist ()
	{
		// Given
		String invalidUserCode = "INVALID_USER";
		CreateOrUpdateInventoryItemRequestDto requestDto = CreateOrUpdateInventoryItemRequestDto.builder()
				.productName( "Test Product" )
				.brandName( "Test Brand" )
				.quantity( "1" )
				.build();

		when( userRepository.findUserByUserCode( invalidUserCode ) ).thenReturn( Optional.empty() );

		// When / Then
		IllegalStateException exception = assertThrows( IllegalStateException.class,
				() -> inventoryItemController.createOrUpdateInventoryItem( invalidUserCode, requestDto ) );

		assertThat( exception.getMessage() ).contains( "userCode " + invalidUserCode + " not found." );
		verify( productRepository, never() ).save( any( Product.class ) );
		verify( inventoryItemRepository, never() ).save( any( InventoryItem.class ) );
	}

	@Test
	@DisplayName( "Should return not found when product ID does not exist" )
	void shouldReturnNotFoundWhenProductIdDoesNotExist ()
	{
		// Given
		UUID nonExistentProductId = UUID.randomUUID();
		CreateOrUpdateInventoryItemRequestDto requestDto = CreateOrUpdateInventoryItemRequestDto.builder()
				.productId( nonExistentProductId.toString() )
				.productName( "Test" )
				.build();

		when( userRepository.findUserByUserCode( testUserCode ) ).thenReturn( Optional.of( testUser ) );
		when( productRepository.findById( nonExistentProductId ) ).thenReturn( Optional.empty() );

		// When
		ResponseEntity<CreateOrUpdateInventoryItemResponseDto> response = inventoryItemController.createOrUpdateInventoryItem( testUserCode, requestDto );

		// Then
		assertThat( response.getStatusCode() ).isEqualTo( HttpStatus.NOT_FOUND );
		verify( productRepository, never() ).save( any( Product.class ) );
		verify( inventoryItemRepository, never() ).save( any( InventoryItem.class ) );
	}

	@Test
	@DisplayName( "Should return bad request when request lacks required product details" )
	void shouldReturnBadRequestWhenRequestLacksDetails ()
	{
		// Given - Product is incomplete but user doesn't provide name and brand
		UUID incompleteProductId = UUID.randomUUID();
		CreateOrUpdateInventoryItemRequestDto requestDto = CreateOrUpdateInventoryItemRequestDto.builder()
				.productId( incompleteProductId.toString() )
				// Missing productName and productBrandName
				.build();

		// When
		ResponseEntity<CreateOrUpdateInventoryItemResponseDto> response = inventoryItemController.createOrUpdateInventoryItem( testUserCode, requestDto );

		// Then
		assertThat( response.getStatusCode() ).isEqualTo( HttpStatus.BAD_REQUEST );
		verify( productRepository, never() ).save( any( Product.class ) );
		verify( inventoryItemRepository, never() ).save( any( InventoryItem.class ) );
	}

	@Test
	@DisplayName( "Should create inventory item without best before date when not provided" )
	void shouldCreateInventoryItemWithoutBestBeforeDate ()
	{
		// Given
		UUID existingProductId = UUID.randomUUID();
		Product existingProduct = Product.builder()
				.id( existingProductId )
				.name( "Salt" )
				.brandName( "Generic" )
				.quantity( "1kg" )
				.incomplete( false )
				.build();

		CreateOrUpdateInventoryItemRequestDto requestDto = CreateOrUpdateInventoryItemRequestDto.builder()
				.productId( existingProductId.toString() )
				.productName( "Salt" )
				.bestBefore( null ) // No best before date
				.build();

		UUID inventoryItemId = UUID.randomUUID();
		InventoryItem savedInventoryItem = InventoryItem.builder()
				.id( inventoryItemId )
				.user( testUser )
				.product( existingProduct )
				.productName( existingProduct.getName() )
				.brandName( existingProduct.getBrandName() )
				.quantity( existingProduct.getQuantity() )
				.bestBeforeDate( null )
				.storedInFridge( true )
				.opened( false )
				.dateAddedAt( Instant.now() )
				.build();

		when( userRepository.findUserByUserCode( testUserCode ) ).thenReturn( Optional.of( testUser ) );
		when( productRepository.findById( existingProductId ) ).thenReturn( Optional.of( existingProduct ) );
		when( inventoryItemRepository.save( any( InventoryItem.class ) ) ).thenReturn( savedInventoryItem );

		// When
		ResponseEntity<CreateOrUpdateInventoryItemResponseDto> response = inventoryItemController.createOrUpdateInventoryItem( testUserCode, requestDto );

		// Then
		assertThat( response.getStatusCode() ).isEqualTo( HttpStatus.OK );
		assertThat( response.getBody() ).isNotNull();
		assertThat( response.getBody().getBestBefore() ).isNull();

		// Verify inventory item was created with null best before date
		ArgumentCaptor<InventoryItem> itemCaptor = ArgumentCaptor.forClass( InventoryItem.class );
		verify( inventoryItemRepository, times( 1 ) ).save( itemCaptor.capture() );
		InventoryItem capturedItem = itemCaptor.getValue();
		assertThat( capturedItem.getBestBeforeDate() ).isNull();
	}

	@Test
	@DisplayName( "Should create inventory item and set default values" )
	void shouldCreateInventoryItemWithDefaultValues ()
	{
		// Given
		UUID existingProductId = UUID.randomUUID();
		Product existingProduct = Product.builder()
				.id( existingProductId )
				.name( "Test Product" )
				.brandName( "Test Brand" )
				.quantity( "100g" )
				.incomplete( false )
				.build();

		CreateOrUpdateInventoryItemRequestDto requestDto = CreateOrUpdateInventoryItemRequestDto.builder()
				.productId( existingProductId.toString() )
				.productName( "Test Product" )
				.build();

		UUID inventoryItemId = UUID.randomUUID();
		InventoryItem savedInventoryItem = InventoryItem.builder()
				.id( inventoryItemId )
				.user( testUser )
				.product( existingProduct )
				.productName( existingProduct.getName() )
				.brandName( existingProduct.getBrandName() )
				.quantity( existingProduct.getQuantity() )
				.storedInFridge( true )
				.opened( false )
				.dateAddedAt( Instant.now() )
				.build();

		when( userRepository.findUserByUserCode( testUserCode ) ).thenReturn( Optional.of( testUser ) );
		when( productRepository.findById( existingProductId ) ).thenReturn( Optional.of( existingProduct ) );
		when( inventoryItemRepository.save( any( InventoryItem.class ) ) ).thenReturn( savedInventoryItem );

		// When
		ResponseEntity<CreateOrUpdateInventoryItemResponseDto> response = inventoryItemController.createOrUpdateInventoryItem( testUserCode, requestDto );

		// Then
		assertThat( response.getStatusCode() ).isEqualTo( HttpStatus.OK );

		// Verify inventory item was created with default values
		ArgumentCaptor<InventoryItem> itemCaptor = ArgumentCaptor.forClass( InventoryItem.class );
		verify( inventoryItemRepository, times( 1 ) ).save( itemCaptor.capture() );
		InventoryItem capturedItem = itemCaptor.getValue();
		assertThat( capturedItem.isStoredInFridge() ).isTrue(); // default for now
		assertThat( capturedItem.isOpened() ).isFalse();
		assertThat( capturedItem.getDateAddedAt() ).isNotNull();
	}

	@Test
	void scenario_scannedProductDoesNotExitYet ()
	{
		String barcode = "5449000131836";

		// Given
		UUID existingProductId = UUID.randomUUID();
		Product existingProduct = Product.builder()
				.id( existingProductId )
				.name( "Test Product" )
				.brandName( "Test Brand" )
				.quantity( "100g" )
				.incomplete( false )
				.build();

		CreateOrUpdateInventoryItemRequestDto requestDto = CreateOrUpdateInventoryItemRequestDto.builder()
				.productId( existingProductId.toString() )
				.productName( "Test Product" )
				.build();

		UUID inventoryItemId = UUID.randomUUID();
		InventoryItem savedInventoryItem = InventoryItem.builder()
				.id( inventoryItemId )
				.user( testUser )
				.product( existingProduct )
				.productName( existingProduct.getName() )
				.brandName( existingProduct.getBrandName() )
				.quantity( existingProduct.getQuantity() )
				.storedInFridge( true )
				.opened( false )
				.dateAddedAt( Instant.now() )
				.build();

		when( userRepository.findUserByUserCode( testUserCode ) ).thenReturn( Optional.of( testUser ) );
		when( productRepository.findById( existingProductId ) ).thenReturn( Optional.of( existingProduct ) );
		when( inventoryItemRepository.save( any( InventoryItem.class ) ) ).thenReturn( savedInventoryItem );

		// When
		ResponseEntity<CreateOrUpdateInventoryItemResponseDto> response = inventoryItemController.createOrUpdateInventoryItem( testUserCode, requestDto );

		// Then
		assertThat( response.getStatusCode() ).isEqualTo( HttpStatus.OK );

		// Verify inventory item was created with default values
		ArgumentCaptor<InventoryItem> itemCaptor = ArgumentCaptor.forClass( InventoryItem.class );
		verify( inventoryItemRepository, times( 1 ) ).save( itemCaptor.capture() );
		InventoryItem capturedItem = itemCaptor.getValue();
		assertThat( capturedItem.isStoredInFridge() ).isTrue(); // default for now
		assertThat( capturedItem.isOpened() ).isFalse();
		assertThat( capturedItem.getDateAddedAt() ).isNotNull();
	}
}

