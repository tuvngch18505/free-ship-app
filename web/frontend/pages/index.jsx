import { useNavigate, Loading } from "@shopify/app-bridge-react";
import {
    Card,
    EmptyState,
    Layout,
    Page,
    SkeletonBodyText,
    LegacyCard,
    Link,
    Button,
    Banner,

} from "@shopify/polaris"
import { BoosterIndex } from "../components";
import { useEffect, useState } from 'react';
import { useAppQuery } from "../hooks";



export default function Hompage() {
    /*
   Thêm móc sử dụng Cầu nối ứng dụng để thiết lập chức năng điều hướng. 
   Chức năng này sửa đổi URL trình duyệt cấp cao nhất để bạn có thể 
   hướng trong ứng dụng được nhúng và giữ cho trình duyệt được đồng bộ hóa khi tải lại.
   */
    const navigate = useNavigate();
    /* Đây là những giá trị giả. Đặt các giá trị này cho phép bạn xem trước đánh dấu tải và trạng thái trống. */
    const [data, setData] = useState([]);

    const handleNewBooster = () => {
        navigate("/boosters/new");
    }
    const shopifyBogoAppstoreLink = "https://apps.shopify.com/discos-smart-bogo-cart-upsell?locale=fr";
    const handleButtonClick = () => {
        window.open(shopifyBogoAppstoreLink, "_blank");
    };
    const
        {
            data: Boosters,
            isLoading,
            isRefetching,
        } = useAppQuery(
            { url: `/api/boosters`, }
        )


    const boosterMarkup = Boosters?.length ? (
        <BoosterIndex Boosters={Boosters} loading={isRefetching} />
    ) : null;

    /* loading Markup sử dụng thành phần tải từ App Bridge và các thành phần từ Polaris */
    const loadingMarkup = isLoading ? (
        <Card sectioned>
            <Loading />
            <SkeletonBodyText />
        </Card>
    ) : null;

    const emptyStateMarkup = !isLoading && !Boosters?.length ? (
        <Card sectioned>
            <EmptyState
                heading="This is where you’ll manage your Order Value Boosters"
                /* Nút này sẽ đưa người dùng đến trang Tạo Booster */
                action={{
                    content: "Create a new Booster",
                    onAction: handleNewBooster,
                }}
                image="https://freeshipping-essential-apps.uk/empty2.svg"

            >
                <p>
                    Start by creating your first order value booster and publishing it to your store

                </p>

            </EmptyState>
        </Card>
    ) : null;


    /*
     Sử dụng các thành phần Trang Polaris để tạo bố cục trang và,
     bao gồm nội dung trạng thái trống được đặt ở trên.
    */
    const [isBannerVisible, setIsBannerVisible] = useState(true);
    function handleBannerDismiss() {
        setIsBannerVisible(false);
    }

    let searchParams = new URLSearchParams(window.location.search);
    let shop_domain = searchParams.get("shop");

    const enableAppUrl = `https://${shop_domain}/admin/themes/current/editor?context=apps&appEmbed=${process.env.SHOPIFY_FREE_SHIP_ID}/app-embed`
      
    return (
        <>
            {isBannerVisible && (
                <Banner
                    title="App embedding needs to be enabled"
                    action={{ content: 'Enable now', url: enableAppUrl }}
                    onDismiss={handleBannerDismiss}
                >
                    <p>The app embed has to be enabled in app blocks for it to work.</p>
                </Banner>
            )}
            <Page
                title="Your order value boosters!!"
                primaryAction={{
                    content: "Create a new Booster",
                    onAction: handleNewBooster
                }}
            >

                <Layout>

                    <Layout.Section>
                        {loadingMarkup}
                        {boosterMarkup}
                        {emptyStateMarkup}
                    </Layout.Section>
                    <Layout.Section>
                        <LegacyCard title="[Required] Setup Free Shipping" sectioned>
                            <p>Follow these steps to setup free shipping with a minimum order value for your Shopify store:
                            </p>
                            <p>1. Go to Shopify Settings and then Shipping and delivery.</p>
                            <p>2. Choose a shipping profile and click “Manage rates”.</p>
                            <p>3. Click "Add rate". </p>
                            <p>4. Setup your free shipping name and leave đ0.00 price. </p>
                            <p>5. Click “Add conditions”.</p>
                            <p>6. Select "Based on order price"</p>
                            <p>7. Input minimum price (should be same as the order value goal in this application). </p>
                            <br></br>
                            <Link url="https://www.shopify.com/admin/settings/shipping" external>
                                <Button>Setup Free Shipping</Button>

                            </Link>

                        </LegacyCard>

                        <br></br>
                        <br></br>

                        <b> Apps you might like</b>
                        <br></br>
                        <br></br>

                    </Layout.Section>


                    <Layout>
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
                            <br></br>
                            <br></br>
                            <br></br>
                        </Layout.Section>
                    </Layout>
                </Layout>

            </Page>

        </>
    )
}