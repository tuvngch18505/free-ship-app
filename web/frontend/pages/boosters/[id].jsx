import { Card, Page, Layout, SkeletonBodyText, Badge } from '@shopify/polaris'
import { Loading } from "@shopify/app-bridge-react"
import { BoosterForm } from "../../components"
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppQuery } from '../../hooks';

export default function BoosterEdit() {
    const breadcrumbs = [{ content: "Booster", url: "/" }];
    const { id } = useParams();
    // const [Booster, setBooster] = useState({});

    // useEffect(() => {
    //     fetch(`/api/boosters/${id}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             setBooster(data);
    //         })
    //         .catch(error => console.error(error));
    // }, [id]);


    /*
  Fetch the Boosters.
  useAppQuery uses useAuthenticatedQuery from App Bridge to authenticate the request.
  The backend supplements app data with data queried from the Shopify GraphQL Admin API.
*/
    // const isLoading = false;
    // const isRefetching = false;
    const {
        data: Booster,
        isLoading,
        isRefetching
    } = useAppQuery({
        url: `/api/boosters/${id}`,
        reactQueryOptions: {
            /* Disable refetching because the QRCodeForm component ignores changes to its props */
            refetchOnReconnect: false,
        },
    });

    /*
      Đây là những giá trị giả.
      Đặt isLoading thành false để xem trước trang mà không tải đánh dấu.
   */


    /* Đang tải hành động và đánh dấu sử dụng các thành phần App Bridge và Polaris */
    if (isLoading || isRefetching) {
        return (
            <Page
                title='Edit Booster'
                breadcrumbs={breadcrumbs}
                titleMetadata={<Badge status="new"> Not Published</Badge>}
                primaryAction={{
                    content: 'Publish'
                }}
                secondaryActions={[
                    { content: 'Delete', destructive: true, style: { color: "red" } },
                    { content: 'Save', }

                ]}
                fullWidth
            >
                <Loading />
                <Layout >
                    <Layout.Section>
                        <Card sectioned title="Order your value">
                            <SkeletonBodyText />
                        </Card>
                    </Layout.Section>

                </Layout>

            </Page>
        )
    }

    return (
        <>
            <BoosterForm Booster={Booster} />
        {console.log(Booster)}
        </>
    )
}