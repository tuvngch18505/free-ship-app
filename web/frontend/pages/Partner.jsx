import {
  Card,
  EmptyState,
  Layout,
  Page,
  SkeletonBodyText,
  LegacyCard,
  Link,
  Button,
  

} from "@shopify/polaris"


export default function Partner() {
  const shopifyBogoAppstoreLink = "https://apps.shopify.com/discos-smart-bogo-cart-upsell?locale=fr";
  const handleButtonClick = () => {
    window.open(shopifyBogoAppstoreLink, "_blank");
  };
  return (
    <Page title="Our Partner">
      
      <Layout >
        <Layout.Section oneThird>
          <Card>
            <Card.Section >
              <img src="https://cdn.shopify.com/app-store/listing_images/56bc38aef928b8ff2bfbd112c6fd2784/desktop_screenshot/CPerqs7elvwCEAE=.png?height=900&width=1600" alt="BOGO" />
              <br></br>
              <h2>
                <b>BOGO+ | Free Gift & Flash Sale</b>
              </h2>
              <br></br>
              <p>BOGO, Free Gift with Purchase, Flash Sale, Volume Discount</p>
              <br></br>
              <p>
                <b>4.9 ⭐</b>
              </p>
              <br></br>
              <span>
                <Button fullWidth onClick={handleButtonClick}>
                  View on Shopify app store
                </Button>
              </span>
            </Card.Section>
          </Card>
        </Layout.Section>
        <Layout.Section oneThird>
          <Card>
            <Card.Section>
              <img src="https://cdn.shopify.com/app-store/listing_images/8cada0f5da411a64e756606bb036f1ed/desktop_screenshot/CMPRgOisjvgCEAE=.png?height=900&width=1600" alt="Judge.me" />
              <br></br>
              <h2>
                <b>Judge.me Product Reviews</b>
              </h2>
              <br></br>
              <p>Collect and display product reviews and star ratings to build trust available</p>
              <br></br>
              <p>
                <b>5.0 ⭐</b>
              </p>
              <br></br>
              <span>
                <Button fullWidth onClick={() => window.open("https://apps.shopify.com/judgeme?locale=fr", "blank")}>
                  View on Shopify app store
                </Button>
              </span>
            </Card.Section>
          </Card>
        </Layout.Section>
        <Layout.Section oneThird>
          <Card>
            <Card.Section>
              <img src="https://cdn.shopify.com/app-store/listing_images/f85ee597169457da8ee70b6652cae768/desktop_screenshot/CIaX5OOa6fsCEAE=.png?height=900&width=1600" alt="PageFly" />
              <br></br>
              <h2>
                <b>PageFly Landing Page Builder
                </b>
              </h2>
              <br></br>
              <p>Create the pages and sections of your idea. It's up to you to play with your shop.</p>
              <br></br>
              <p>
                <b>4.9 ⭐</b>
              </p>
              <br></br>
              <span>
                <Button fullWidth onClick={() => window.open("https://apps.shopify.com/pagefly?locale=fr", "blank")}>
                  View on Shopify app store
                </Button>
              </span>
            </Card.Section>
          </Card>

        </Layout.Section>
        <Layout.Section oneThird>
          <Card>
            <Card.Section >
              <img src="https://freeshipping-essential-apps.uk/reconvert1.jpg" alt="BOGO" />
              <br></br>
              <h2>
                <b>ReConvert upsell & Cross sell</b>
              </h2>
              <br></br>
              <p>ReConvert is the #1 upsell app for Shopify trusted by +40,000 stores 💵</p>
              <br></br>
              <p>
                <b>4.9 ⭐</b>
              </p>
              <br></br>
              <span>
                <Button fullWidth onClick={() => window.open("https://apps.shopify.com/reconvert-upsell-cross-sell?locale=fr&utm_campaign=essential-apps&utm_id=banner-exchange&utm_medium=essential-apps&utm_source=banner-exchange", "blank")}>
                  View on Shopify app store
                </Button>
              </span>
            </Card.Section>
          </Card>
        </Layout.Section>
        <Layout.Section oneThird>
          <Card>
            <Card.Section >
              <img src="https://freeshipping-essential-apps.uk/trustoo.io_banner1.jpg" alt="Trustoo.io" />
              <br></br>
              <h2>
                <b>Trustoo.io Product Reviews</b>
              </h2>
              <br></br>
              <p>The #1 Shopify review app. Import, mange, collect, translate Reviews</p>
              <br></br>
              <p>
                <b>5.0 ⭐</b>
              </p>
              <br></br>
              <span>
                <Button fullWidth onClick={() => window.open("https://apps.shopify.com/sealapps-product-review?from=Essentialshome&locale=fr&utm_campaign=crossPromote&utm_medium=home&utm_source=Essentials", "blank")}>
                  View on Shopify app store
                </Button>
              </span>
            </Card.Section>
          </Card>
        </Layout.Section>
        <Layout.Section oneThird>
          <Card>
            <Card.Section >
              <img src="https://cdn.shopify.com/app-store/listing_images/9de191ada108ac44b15a7dbff97046df/promotional_image/CNH31uyfzPUCEAE=.png" alt="InstaPlus" />
              <br></br>
              <h2>
                <b>InstaPlus - Instagram Feed</b>
              </h2>
              <br></br>
              <p>Instagram Feed, Shoppable Instagram, Product Page Gallery, UGC</p>
              <br></br>
              <p>
                <b>4.7 ⭐</b>
              </p>
              <br></br>
              <span>
                <Button fullWidth onClick={() => window.open("https://apps.shopify.com/instaplus-shoppable-instagram?locale=fr", "blank")}>
                  View on Shopify app store
                </Button>
              </span>
            </Card.Section>
          </Card>
        </Layout.Section>
        <br></br>
        <br></br>
        <br></br>
      </Layout>
    </Page>
  );
}
