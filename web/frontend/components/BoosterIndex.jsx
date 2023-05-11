import { useNavigate } from "@shopify/app-bridge-react";

import {
  Badge,
  Card,
  IndexTable,
  Stack,
  TextStyle,
  UnstyledLink,

} from "@shopify/polaris";

/* useMedia is used to support multiple screen sizes */
import { useMedia } from "@shopify/react-hooks"
/* Markup for small screen sizes (mobile) */
function SmallScreenCard({
  _id, boosterName, design: { position }, status, navigate
}) {
  return (
    <UnstyledLink onClick={() => navigate(`/boosters/${_id}`)}>
      <div
        style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #E1E3E5" }}
      >
        <Stack>
          <Stack.Item fill>
            <Stack vertical={true}>
              <Stack.Item>
                <p>
                  <TextStyle variation="strong">
                    {truncate(boosterName, 35)}
                  </TextStyle>
                </p>
                <br></br>
                <p>{truncate(position, 35)}</p>
                <br></br>
                <p>
                  {
                    status === "Published" ? (
                      <Badge status="success">  {status} </Badge>
                    ) : (
                      <Badge status="new">  {status} </Badge>
                    )
                  }
                </p>
              </Stack.Item>
            </Stack>
          </Stack.Item>
        </Stack>
      </div>
    </UnstyledLink>
  )
}


export function BoosterIndex({ Boosters, loading }) {
  const navigate = useNavigate();


  const resourceName = {
    singular: "Booster",
    plural: "Boosters",
  };

  const rowMarkup = Boosters.map(
    ({ _id, boosterName, design: { position }, status }, index) => {
      return (
        <IndexTable.Row
          id={_id}
          key={_id}
          position={index}
          onClick={() => {
            navigate(`/boosters/${_id}`);
          }}
        >
          <IndexTable.Cell>
            <UnstyledLink data-primary-link url={`/boosters/${_id}`}>
              {truncate(boosterName, 25)}
            </UnstyledLink>
          </IndexTable.Cell>
          <IndexTable.Cell>
            {truncate(position, 25)}
          </IndexTable.Cell>
          <IndexTable.Cell>
            {
              status === "Published" ? (
                <Badge status="success">  {status} </Badge>
              ) : (
                <Badge status="new">  {status} </Badge>
              )
            }
          </IndexTable.Cell>
        </IndexTable.Row>
      );
    }
  );


  /* Check if screen is small */
  const isSmallScreen = useMedia("(max-width: 640px)");
  /* Map over QRCodes for small screen */
  const smallScreenMarkup = Boosters.map((Booster) => (
    <SmallScreenCard key={Booster._id} navigate={navigate} {...Booster} />
  ));
  return (
    <>
      <Card>
        {
          isSmallScreen ? (
            smallScreenMarkup
          ) : (
            <IndexTable
              resourceName={resourceName}
              itemCount={Boosters.length}
              headings={[
                {
                  title: "Booster name",
                },
                {
                  title: "Type",
                },
                {
                  title: "Status",
                },
              ]}
              selectable={false}
              loading={loading}
            >
              {rowMarkup}

            </IndexTable>
          )
        }
      </Card>
    </>
  );
}

/* Hàm cắt chuỗi dài */
function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
}
