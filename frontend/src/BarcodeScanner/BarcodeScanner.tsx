import { Button } from "@radix-ui/themes";
import { cancel, Format, scan } from "@tauri-apps/plugin-barcode-scanner";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import "./BarcodeScanner.css";

export function BarcodeScanner() {
  const navigate = useNavigate();
  
  /*
  The barcode scanner will be displayed behind the WebView.
  We render the background transparent to allow the camera view to be seen.
  */
  useEffect(() => setBackgroundTransparent());

  // Open the scanner as soon as the component is mounted
  useEffect(() => { 
    scanBarcode();
  });

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

    await navigate("/");
  };

  async function cancelScanner() {
    await cancel();
    await navigate("/");
  }

  return <>
    <Button type="button" onClick={() => cancelScanner()}>
      Cancel
    </Button>
  </>;
}

function setBackgroundTransparent(): () => void {
  const radixBackgroundProperty = '--color-background';
  const radixTheme = document.querySelector('.radix-themes') as HTMLElement;

  const originalRadixColor = radixTheme.style.getPropertyValue(radixBackgroundProperty);
  const originalDocumentColor = document.documentElement.style.backgroundColor;

  radixTheme.style.setProperty(radixBackgroundProperty, 'transparent');
  document.documentElement.style.backgroundColor = 'transparent';

  return () => {
    radixTheme.style.setProperty(radixBackgroundProperty, originalRadixColor);
    document.documentElement.style.backgroundColor = originalDocumentColor;
  };
}
