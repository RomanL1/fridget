import { Button } from "@radix-ui/themes";
import { cancel, Format, scan } from "@tauri-apps/plugin-barcode-scanner";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function BarcodeScanner() {
  const navigate = useNavigate();
  const radixBackgroundProperty = '--color-page-background';

  useEffect(() => {
    const originalColor = document.documentElement.style.getPropertyValue(radixBackgroundProperty);
    document.documentElement.style.setProperty(radixBackgroundProperty, 'transparent');

    return () => {
      document.documentElement.style.setProperty(radixBackgroundProperty, originalColor);
    };
  }, []);

  const scanBarcode = async () => {
    try {
      const result = await scan({
        windowed: true,
        formats: [Format.EAN13],
        cameraDirection: "back",
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }

    navigate("/");
  };

  useEffect(() => {
    scanBarcode();
  });

  async function cancelScanner() {
    await cancel();
    navigate("/");
  }

  return (
    <Button type="button" onClick={() => cancelScanner()}>
      Cancel
    </Button>
  );
}
