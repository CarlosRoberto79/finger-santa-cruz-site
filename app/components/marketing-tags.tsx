import Script from "next/script";
import {
  GA4_MEASUREMENT_ID,
  META_PIXEL_ID,
} from "../lib/marketing-events";

export function MarketingTags() {
  return (
    <>
      <Script id="google-analytics-direct" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_MEASUREMENT_ID}');`}
      </Script>
      <Script
        id="google-analytics-library"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="meta-pixel-direct" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');
fbq('track','PageView');`}
      </Script>
      <Script id="tintim-pixel" strategy="afterInteractive">
        {`(function(window, document, script) {
  if (!window.tt) {
    window.tt = {};
    const head = document.getElementsByTagName("head")[0];
    const loader = document.createElement("script");
    loader.async = 1;
    loader.src = script;
    head.appendChild(loader);
  }
  window.tt.accountCode = "f0917ae2-b8c6-4982-bd89-07a661ad4428";
})(window, document, "//s.tintim.app/static/core/tintim-1.0.js");`}
      </Script>
    </>
  );
}
