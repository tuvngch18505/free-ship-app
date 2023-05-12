import { useState, useCallback, useEffect } from "react";
import {
    Page,
    Form,
    Text,
    Badge,
    Tabs,
    TextField,
    Button,
    Select,
    Layout,
    LegacyCard,
    Popover,
} from "@shopify/polaris";

import React from 'react'
import { SketchPicker } from 'react-color'
import {
    useAppBridge,
    useNavigate
} from "@shopify/app-bridge-react";
import { useAppQuery } from "../hooks";

/* Nhập hook useAuthenticatedFetch có trong mẫu ứng dụng Node */
import { useAuthenticatedFetch } from "@shopify/app-bridge-react";
import { useParams } from "react-router-dom";

// const NO_DISCOUNT_OPTION = { label: "No discount", value: "" };
// /*
//   The discount codes available in the store.

//   This variable will only have a value after retrieving discount codes from the API.
// */
// const DISCOUNT_CODES = {};


export function BoosterForm({ Booster: InitialBooster }) {
    const [Booster, setBooster] = useState(InitialBooster)
    const navigate = useNavigate();
    const appBrige = useAppBridge();
    const fetch = useAuthenticatedFetch();
    const { id } = useParams();
    const isCreating = id === '/boosters/new'
    const breadcrumbs = [{ content: "Create Booster", url: '/' }];
    const [backgroundImage, setBackgroundImage] = useState(Booster?.design.backgroundImage || 'None');


    const [boosterName, setBoosterName] = useState(Booster?.boosterName || "Order value booster");
    const [goal, setGoal] = useState(Booster?.content.goal || '50');
    const [message, setMessage] = useState(Booster?.content.message || 'Free shipping for orders over {order-value}đ!');
    const [progressMessage, setProgressMessage] = useState(Booster?.content.progressMessage || "You’re only {order-value-progress} away from free shipping!")
    const [goalReachedMessage, setGoalReachedMessage] = useState(Booster?.content.goalReachedMessage || "Congratulations! You've got free shipping!',")
    const [positionSelected, setPositionSelected] = useState(Booster?.design.position || "Top page")
    const [fontSelected, setFontSelected] = useState(Booster?.design.font || "Use your theme fonts");
    const [fontSize, setFontSize] = useState(Booster?.design.fontSize || '16')
    const [templateSelected, setTemplateSelected] = useState(Booster?.design.template || 'Custom');
    const [popoverActive, setPopoverActive] = useState(false);
    const [popoverActive1, setPopoverActive1] = useState(false);
    // const [discountId, setDiscountId] = useState(Booster?.discountId || NO_DISCOUNT_OPTION.value);
    // const [discountCode, setDiscountCode] = useState(Booster?.discountCode || "");
    const [cardColor, setCardColor] = useState(Booster?.design.backgroundColor || '#dfd9d9');
    const handleCardColorChange = (value) => {
        setCardColor(value.hex);
    }

    const [messageColor, setMessageColor] = useState(Booster?.design.messageColor || '#00000');
    const handleMessageColorChange = (value) => {
        setMessageColor(value.hex);
    }


    const [selected, setSelected] = useState(0);

    const handleMessageChange = (value) => {
        setMessage(value);
    }

    useEffect(() => {
        if (!message.includes('{order-value}')) {
            setMessage(`Free shipping for orders over ${goal}`);
        }
    }, [goal]);


    const handleBoosterGoalChange = (value) => {
        if (!isNaN(value)) {
            setGoal(value);
        } else {
            alert('Please enter a valid number for the goal.');
        }
    }

    const handleTemplateSelectedChange = (value) => {
        setTemplateSelected(value)
    }

    const handleImageClick = (imageURL) => {
        setBackgroundImage(imageURL);
        setCardColor("#ffffff");
    }


    const activator = (
        <button onClick={() => setPopoverActive((popoverActive) => !popoverActive)} className="btnCard" style={{ backgroundColor: `${cardColor}` }}>

        </button>
    )

    const activator1 = (
        <button onClick={() => setPopoverActive1((popoverActive1) => !popoverActive1)} className="btnMessage" style={{ backgroundColor: `${messageColor}` }}>

        </button>
    )

    //Use Callback();
    //Use Effect();

    useEffect(() => {
        if (templateSelected === "Black and White") {
            const progressBarFill = document.querySelector(".progress-bar-fill");
            progressBarFill.style.backgroundColor = 'black',
                progressBarFill.style.color = 'white'
            setCardColor('#000000');
            setMessageColor('#ffffff');
        } else if (templateSelected === "Custom") {
            const progressBarFill = document.querySelector(".progress-bar-fill");
            progressBarFill.style.backgroundColor = '#FFFFFF',
                progressBarFill.style.color = '#202223'
            setCardColor('#dfd9d9');
            setMessageColor('#202223')
        } else if (templateSelected === "Vibrant") {
            const progressBarFill = document.querySelector(".progress-bar-fill");
            progressBarFill.style.backgroundColor = '#ffffff',
                progressBarFill.style.color = '#842fe6'
            setCardColor('#dfd9d9');
            setMessageColor('#9b5de5')
        }
        else if (templateSelected === "Electric") {
            const progressBarFill = document.querySelector(".progress-bar-fill");
            progressBarFill.style.backgroundColor = '#b0ead7',
                progressBarFill.style.color = '#192c6b'
            setCardColor('#b0ead7');
            setMessageColor('#192c6b')
        }
        else if (templateSelected === "Dark Ocean") {
            const progressBarFill = document.querySelector(".progress-bar-fill");
            progressBarFill.style.backgroundColor = '#222831',
                progressBarFill.style.color = '#c0deed'
            setCardColor('#222831');
            setMessageColor('#c0deed')
        } else if (templateSelected === "Mint") {
            const progressBarFill = document.querySelector(".progress-bar-fill");
            progressBarFill.style.backgroundColor = '#b0ead7',
                progressBarFill.style.color = '#006d71'
            setCardColor('#b0ead7');
            setMessageColor('#006d71')
        } else {
            const progressBarFill = document.querySelector(".progress-bar-fill");
            progressBarFill.style.backgroundColor = cardColor;
            progressBarFill.style.color = messageColor;

        }
    }, [templateSelected])




    /* -- Template State -- */
    /* -- FontSize -- */

    const handleTabChange = (selectedTabIndex) => {
        setSelected(selectedTabIndex);
    }

    const handlePublish = async () => {
        if (Booster?.status === "Published") {
            const BoosterId = id;
            /* xây dựng URL phù hợp để gửi yêu cầu API dựa trên việc mã QR là mới hay đang được cập nhật */
            const url = BoosterId ? `/api/boosters/${BoosterId}` : "/api/boosters";
            /* điều kiện để chọn phương thức HTTP phù hợp: PATCH để cập nhật Booster hoặc POST để tạo Booster mới */
            const method = BoosterId ? "PATCH" : "POST";
            /* sử dụng tìm nạp (đã xác thực) từ App Bridge để gửi yêu cầu tới API và nếu thành công, 
            hãy xóa biểu mẫu để đặt lại ContextualSaveBar và phân tích cú pháp JSON phản hồi */
            const response = fetch(url, {
                method,
                body: JSON.stringify({
                    boosterName: boosterName,
                    goal: goal,
                    message: message,
                    progressMessage: progressMessage,
                    goalReachedMessage: goalReachedMessage,
                    position: positionSelected,
                    template: templateSelected,
                    backgroundImage: backgroundImage,
                    backgroundColor: cardColor,
                    font: fontSelected,
                    fontSize: fontSize,
                    messageColor: messageColor,
                    status: "Unpublished",
                }),
                headers: { "Content-Type": "application/json" }
            })

            if (response.ok) {

                const Booster = await response.json();
                /* nếu đây là Booster mới, hãy lưu mã QR và điều hướng đến trang chỉnh sửa; 
                hành vi này là tiêu chuẩn khi lưu tài nguyên trong trang quản trị Shopify */
                if (!BoosterId) {
                    navigate(`/boosters/${id}`);
                    /* if this is a QR code update, update the QR code state in this component */
                } else {
                    /* nếu đây là bản cập nhật Booster, hãy cập nhật trạng thái Booster trong thành phần này */
                    setBooster(Booster);
                }
            }
            navigate('/');
        } else {
            const BoosterId = id;
            /* xây dựng URL phù hợp để gửi yêu cầu API dựa trên việc mã Booster là mới hay đang được cập nhật */
            const url = BoosterId ? `/api/boosters/${BoosterId}` : "/api/boosters";
            /* điều kiện để chọn phương thức HTTP phù hợp: PATCH để cập nhật Booster hoặc POST để tạo Booster mới */
            const method = BoosterId ? "PATCH" : "POST";
            /* sử dụng tìm nạp (đã xác thực) từ App Bridge để gửi yêu cầu tới API và nếu thành công, 
            hãy xóa biểu mẫu để đặt lại ContextualSaveBar và phân tích cú pháp JSON phản hồi */
            const response = fetch(url, {
                method,
                body: JSON.stringify({
                    boosterName: boosterName,
                    goal: goal,
                    message: message,
                    progressMessage: progressMessage,
                    goalReachedMessage: goalReachedMessage,
                    position: positionSelected,
                    template: templateSelected,
                    backgroundImage: backgroundImage,
                    backgroundColor: cardColor,
                    font: fontSelected,
                    fontSize: fontSize,
                    messageColor: messageColor,
                    status: "Published",
                }),
                headers: { "Content-Type": "application/json" }
            })

            if (response.ok) {

                const Booster = await response.json();
                /* nếu đây là Booster mới, hãy lưu mã QR và điều hướng đến trang chỉnh sửa; 
                hành vi này là tiêu chuẩn khi lưu tài nguyên trong trang quản trị Shopify */
                if (!BoosterId) {
                    navigate(`/boosters/${id}`);
                    /* if this is a QR code update, update the QR code state in this component */
                } else {
                    /* nếu đây là bản cập nhật Booster, hãy cập nhật trạng thái Booster trong thành phần này */
                    setBooster(Booster);
                }
            }
            navigate('/');
        }


    }


    const handleSave = async () => {
        if (Booster?.status === "Published") {
            const BoosterId = id;
            /* xây dựng URL phù hợp để gửi yêu cầu API dựa trên việc mã QR là mới hay đang được cập nhật */
            const url = BoosterId ? `/api/boosters/${BoosterId}` : "/api/boosters";
            /* điều kiện để chọn phương thức HTTP phù hợp: PATCH để cập nhật Booster hoặc POST để tạo Booster mới */
            const method = BoosterId ? "PATCH" : "POST";
            /* sử dụng tìm nạp (đã xác thực) từ App Bridge để gửi yêu cầu tới API và nếu thành công, 
            hãy xóa biểu mẫu để đặt lại ContextualSaveBar và phân tích cú pháp JSON phản hồi */
            const response = fetch(url, {
                method,
                body: JSON.stringify({
                    boosterName: boosterName,
                    goal: goal,
                    message: message,
                    progressMessage: progressMessage,
                    goalReachedMessage: goalReachedMessage,
                    position: positionSelected,
                    template: templateSelected,
                    backgroundImage: backgroundImage,
                    backgroundColor: cardColor,
                    font: fontSelected,
                    fontSize: fontSize,
                    messageColor: messageColor,
                    status: "Published",
                }),
                headers: { "Content-Type": "application/json" }
            })

            if (response.ok) {

                const Booster = await response.json();
                /* nếu đây là Booster mới, hãy lưu mã QR và điều hướng đến trang chỉnh sửa; 
                hành vi này là tiêu chuẩn khi lưu tài nguyên trong trang quản trị Shopify */
                if (!BoosterId) {
                    navigate(`/boosters/${id}`);
                    /* if this is a QR code update, update the QR code state in this component */
                } else {
                    /* nếu đây là bản cập nhật Booster, hãy cập nhật trạng thái Booster trong thành phần này */
                    // setBooster(Booster);
                }
            }
            navigate('/');
        } else {
            const BoosterId = id;
            /* xây dựng URL phù hợp để gửi yêu cầu API dựa trên việc mã QR là mới hay đang được cập nhật */
            const url = BoosterId ? `/api/boosters/${BoosterId}` : "/api/boosters";
            /* điều kiện để chọn phương thức HTTP phù hợp: PATCH để cập nhật Booster hoặc POST để tạo Booster mới */
            const method = BoosterId ? "PATCH" : "POST";
            /* sử dụng tìm nạp (đã xác thực) từ App Bridge để gửi yêu cầu tới API và nếu thành công, 
            hãy xóa biểu mẫu để đặt lại ContextualSaveBar và phân tích cú pháp JSON phản hồi */
            const response = fetch(url, {
                method,
                body: JSON.stringify({
                    boosterName: boosterName,
                    goal: goal,
                    message: message,
                    progressMessage: progressMessage,
                    goalReachedMessage: goalReachedMessage,
                    position: positionSelected,
                    template: templateSelected,
                    backgroundColor: cardColor,
                    font: fontSelected,
                    fontSize: fontSize,
                    messageColor: messageColor,
                    status: "Unpublished",
                }),
                headers: { "Content-Type": "application/json" }
            })

            if (response.ok) {

                const Booster = await response.json();
                /* nếu đây là Booster mới, hãy lưu Booster và điều hướng đến trang chỉnh sửa; 
                hành vi này là tiêu chuẩn khi lưu tài nguyên trong trang quản trị Shopify */
                if (!BoosterId) {
                    navigate(`/boosters/${id}`);
                    /* if this is a QR code update, update the QR code state in this component */
                } else {
                    /* nếu đây là bản cập nhật Booster, hãy cập nhật trạng thái Booster trong thành phần này */
                    // setBooster(Booster);
                }
            }
            navigate('/');
        }


    }

    const deleteBooster = useCallback(async () => {
        const confirmDelete = window.confirm("Are you sure delete Booster?");

        if (confirmDelete) {
            const response = await fetch(`/api/boosters/${id}`, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                navigate("/");
            }
        }
    }, [id])

    const tabs =
        [
            {
                id: 'content',
                content: 'Content',
                accessibilityLabel: 'Content',
                panelID: 'content-panel',
            },
            {
                id: 'design',
                content: 'Design',
                accessibilityLabel: 'Content',
                panelID: 'Design-panel',
            },
        ]


//     /*
//          This array is used in a select field in the form to manage discount options.
     
//          It will be extended when the frontend is connected to the backend and the array is populated with discount data from the store.
     
//          For now, it contains only the default value.
//        */

//     /*
//    This function updates the form state whenever a user selects a new discount option.
//    */
//     const handleDiscountChange = useCallback((id) => {
//         discountId.onChange(id);
//         discountCode.onChange(DISCOUNT_CODES[id] || "");

//     }, [])

//     const {
//         data: shopData,
//         isLoading: isLoadingShopData,
//         isError: shopDataError,
//         /* useAppQuery makes a query to `/api/shop-data`, which the backend authenticates before fetching the data from the Shopify GraphQL Admin API */
//     } = useAppQuery({ url: "/api/shop-data" });
//     /*
//        This array is used in a select field in the form to manage discount options
//      */
//     const discountOptions = shopData ? [
//         NO_DISCOUNT_OPTION,
//         ...shopData.codeDiscountNodes.edges.map(
//             ({ node: { id, codeDiscount } }) => {
//                 DISCOUNT_CODES[id] = codeDiscount.codes.edges[0].node.code;

//                 return {
//                     label: codeDiscount.codes.edges[0].node.code,
//                     value: id,
//                 }
//             }
//         )
//     ] : [];

    const panels = [
        {
            //content tab
            id: 'content',
            content: (
                <Layout>
                    <div className='design'>
                        <Form>
                            <LegacyCard >
                                <LegacyCard.Section>
                                    <TextField
                                        value={boosterName}
                                        onChange={(value) => setBoosterName(value)}
                                        label="Order value booster name"
                                        type="text"
                                        autoComplete="off"
                                        helpText="Only visible to you. For your own internal reference."
                                    />
                                </LegacyCard.Section>
                                <LegacyCard.Section title="Goal">
                                    <TextField
                                        value={goal}
                                        onChange={handleBoosterGoalChange}
                                        label="Goal"
                                        type="number"
                                        autoComplete="off"
                                    />
                                    <br></br>
                                    <TextField
                                        value={message}
                                        onChange={handleMessageChange}
                                        label="Message"
                                        type="text"
                                        autoComplete="off"
                                        helpText=" Use {order - value} to display order value."
                                    />
                                    <br />
                                    <TextField
                                        value={progressMessage}
                                        onChange={(value) => setProgressMessage(value)}
                                        label="Progress message"
                                        type="text"
                                        autoComplete="off"
                                        helpText="Use {order - value - progress} to display order value progress."
                                    />
                                    <br></br>

                                    <TextField
                                        value={goalReachedMessage}
                                        onChange={(value) => setGoalReachedMessage(value)}
                                        label="Goal reached message"
                                        type="text"
                                        autoComplete="off"
                                    />
                                </LegacyCard.Section>
                                {/* <LegacyCard.Section title="Discount"
                                    actions={[
                                        {
                                            content: "Create discount",
                                            onAction: () => {
                                                navigate(
                                                    {
                                                        name: "Discount",
                                                        resource: {
                                                            create: true,
                                                        }
                                                    },
                                                    { target: "new" }
                                                )
                                            },
                                        },
                                    ]}
                                >
                                    <Select
                                        label="discount code"
                                        options={discountOptions}
                                        onChange={handleDiscountChange}
                                        value={discountId}
                                        disabled={isLoadingShopData || shopDataError}
                                        labelHidden
                                    />
                                </LegacyCard.Section> */}
                                <LegacyCard.Section>
                                    <Button textAlign="end" onClick={() => handleTabChange(1)}>
                                        Continute to Design
                                    </Button>
                                </LegacyCard.Section>

                            </LegacyCard>
                        </Form>
                    </div>
                </Layout>
            ),
        },
        // Design Tabs
        {
            id: 'design',
            content: (
                <Layout>
                    <div className='design'>
                        <Form>
                            <LegacyCard >
                                <LegacyCard.Section >
                                    <Select
                                        label="Positioning"
                                        options={[
                                            { label: 'Top page', value: 'Top Page' },
                                            { label: 'Bottom Page', value: 'Bottom Page' },
                                        ]}
                                        onChange={(value) => setPositionSelected(value)}

                                        value={positionSelected}
                                    />
                                </LegacyCard.Section>
                                <LegacyCard.Section>
                                    <Select
                                        label="Template"
                                        options={[
                                            { label: 'Custom', value: 'Custom' },
                                            { label: 'Black and White', value: 'Black and White' },
                                            { label: 'Vibrant', value: 'Vibrant' },
                                            { label: 'Electric', value: 'Electric' },
                                            { label: 'Dark Ocean', value: 'Dark Ocean' },
                                            { label: 'Mint', value: 'Mint' },
                                        ]}
                                        onChange={handleTemplateSelectedChange}
                                        value={templateSelected}
                                    />
                                </LegacyCard.Section>

                                <LegacyCard.Section title="Card">
                                    <div className="box" >
                                        <div className='box-selected' >
                                            <Popover
                                                active={popoverActive}
                                                activator={activator}
                                                autofocusTarget="first-node"
                                                onClose={() => setPopoverActive((popoverActive) => !popoverActive)}
                                            >
                                                <SketchPicker color={cardColor} onChange={handleCardColorChange} />

                                            </Popover>
                                        </div>
                                        <div className="box-input" style={{ width: "414px" }}>
                                            <TextField
                                                value={cardColor}
                                                type="text"
                                                label=""
                                                onChange={(value) => { setCardColor(value) }}
                                                autoComplete="off"
                                                className="text-field-input-cardColor"
                                            />

                                        </div>
                                    </div>

                                </LegacyCard.Section>
                                <LegacyCard.Section title="Background image">
                                <div
                                        style={{
                                            width: '100%',
                                            position: 'relative',
                                            marginBottom: '5px',
                                            backgroundImage: 'url(https://assets.apphero.co/images/templates/preview/0.png)',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => handleImageClick(
                                            'https://assets.apphero.co/images/templates/preview/0.png'
                                        )}
                                    >
                                        <div
                                            style={{
                                                color: '#3F3F3F',
                                                textAlign: 'center',
                                                fontSize: '16px',
                                                fontWeight: 'normal',
                                                lineHeight: '20px',
                                                margin: '0',
                                                padding: '12px 10px',
                                                overflow: 'hidden',
                                                width: '100%',
                                                border: 'none',
                                                fontFamily: 'Helvetica',
                                            }}

                                        >
                                            None
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            width: '100%',
                                            position: 'relative',
                                            marginBottom: '5px',
                                            backgroundImage: 'url(https://s3.amazonaws.com/lastsecondcoupon/img/bar_background/20180403_template_congruent_pentagon.png)',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => handleImageClick(
                                            'https://s3.amazonaws.com/lastsecondcoupon/img/bar_background/20180403_template_congruent_pentagon.png'
                                        )}
                                    >
                                        <div
                                            style={{
                                                color: '#3F3F3F',
                                                textAlign: 'center',
                                                fontSize: '16px',
                                                fontWeight: 'normal',
                                                lineHeight: '20px',
                                                margin: '0',
                                                padding: '12px 10px',
                                                overflow: 'hidden',
                                                width: '100%',
                                                border: 'none',
                                                fontFamily: 'Helvetica',
                                            }}

                                        >
                                            Full Spring
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            width: '100%',
                                            position: 'relative',
                                            marginBottom: '5px',
                                            backgroundImage: 'url(https://s3.amazonaws.com/lastsecondcoupon/img/bar_background/20180403_template_waves.png)',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => handleImageClick(
                                            'https://s3.amazonaws.com/lastsecondcoupon/img/bar_background/20180403_template_waves.png'
                                        )}
                                    >
                                        <div
                                            style={{
                                                color: '#3F3F3F',
                                                textAlign: 'center',
                                                fontSize: '16px',
                                                fontWeight: 'normal',
                                                lineHeight: '20px',
                                                margin: '0',
                                                padding: '12px 10px',
                                                overflow: 'hidden',
                                                width: '100%',
                                                border: 'none',
                                                fontFamily: 'Helvetica',
                                            }}

                                        >
                                            Summer Wave
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            width: '100%',
                                            position: 'relative',
                                            marginBottom: '5px',
                                            backgroundImage: 'url(https://s3.amazonaws.com/lastsecondcoupon/img/bar_background/20180403_template_christmas.png)',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() =>
                                            handleImageClick
                                                (
                                                    'https://s3.amazonaws.com/lastsecondcoupon/img/bar_background/20180403_template_christmas.png'
                                                )}

                                    >
                                        <div
                                            style={{
                                                color: '#3F3F3F',
                                                textAlign: 'center',
                                                fontSize: '16px',
                                                fontWeight: 'normal',
                                                lineHeight: '20px',
                                                margin: '0',
                                                padding: '12px 10px',
                                                overflow: 'hidden',
                                                width: '100%',
                                                border: 'none',
                                                fontFamily: 'Helvetica',
                                            }}

                                        >
                                            Classic Xmas
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            width: '100%',
                                            position: 'relative',
                                            marginBottom: '5px',
                                            backgroundImage: 'url(https://s3.amazonaws.com/lastsecondcoupon/img/bar_background/20180403_template_dark_sharp_edges.png)',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() =>
                                            handleImageClick(
                                                'https://s3.amazonaws.com/lastsecondcoupon/img/bar_background/20180403_template_dark_sharp_edges.png'
                                            )
                                        }
                                    >
                                        <div
                                            style={{
                                                color: 'White',
                                                textAlign: 'center',
                                                fontSize: '16px',
                                                fontWeight: 'normal',
                                                lineHeight: '20px',
                                                margin: '0',
                                                padding: '12px 10px',
                                                overflow: 'hidden',
                                                width: '100%',
                                                border: 'none',
                                                fontFamily: 'Helvetica',
                                            }}

                                        >
                                            Black Diamon
                                        </div>
                                    </div>
                                </LegacyCard.Section>

                                <LegacyCard.Section title="Typography">
                                    <Select
                                        label="Font"
                                        options={[
                                            { label: 'Use your theme fonts', value: 'Use your theme fonts' },
                                            { label: 'Helvetica', value: 'Helvetica' },
                                            { label: 'Tahoma', value: 'Tahoma' },
                                            { label: 'Trebuchet MS', value: 'Trebuchet MS' },
                                            { label: 'Times New Roman', value: 'Times New Roman' },
                                            { label: 'Georgia', value: 'Georgia' },
                                            { label: 'Garamond', value: 'Garamond' },
                                            { label: 'Courier New', value: 'Courier New' },
                                        ]}
                                        onChange={(value) => setFontSelected(value)}
                                        value={fontSelected}
                                        helpText="Theme fonts are not available in the preview mode. Publish item to preview it in store."
                                    />
                                    <br></br>
                                    <TextField
                                        label="Font size"
                                        type="number"
                                        value={fontSize}
                                        onChange={(value) => setFontSize(value)}
                                        autoComplete="off"

                                    />
                                    <br></br>
                                    <Text color="subdued" as="span" variant="headingXs">
                                        Message Color
                                    </Text>


                                    <div className="box" style={{ marginTop: "5px" }}>

                                        <div className='box-selected' >
                                            <Popover
                                                active={popoverActive1}
                                                activator={activator1}
                                                autofocusTarget="first-node"
                                                onClose={() => setPopoverActive1((popoverActive1) => !popoverActive1)}
                                            >
                                                {/* <ColorPicker onChange={handleMessageColorChange} color={messageColor} /> */}
                                                <SketchPicker color={messageColor} onChange={handleMessageColorChange} />


                                            </Popover>
                                        </div>
                                        <br></br>
                                        <div className="box-input" style={{ width: "415px" }}>
                                            <TextField
                                                value={messageColor}
                                                type="text"
                                                label=""
                                                onChange={(value) => setMessageColor(value)}
                                                autoComplete="off"

                                            />

                                        </div>
                                    </div>


                                </LegacyCard.Section>

                                <LegacyCard.Section>
                                    <Button onClick={() => { handleTabChange(0) }} >
                                        Continute to Content
                                    </Button>
                                </LegacyCard.Section>
                            </LegacyCard>
                        </Form>
                    </div>
                </Layout>

            ),
        },
    ];

    /* Bố cục biểu mẫu, được tạo bằng các thành phần Polaris và App Bridge. */

    const secondaryActions = [
        {
            content: 'Delete',
            destructive: true,
            style: { color: "red" },
            onAction: deleteBooster,
            disabled: isCreating,
        },
        { content: 'Save', onAction: handleSave }
    ];
    let updatedSecondaryActions;
    if (id) {
        // Nếu có tham số id, tức là đang trong trạng thái chỉnh sửa
        updatedSecondaryActions = [secondaryActions[0], secondaryActions[1]];
    } else {
        // Nếu không có tham số id, tức là đang trong trạng thái tạo mới
        updatedSecondaryActions = [secondaryActions[1]];
    }




    return (
        <Page
            breadcrumbs={breadcrumbs}
            title={boosterName}
            titleMetadata={
                Booster?.status === "Published" ? (
                    <Badge status="success"> Published </Badge>
                ) : (
                    <Badge status="new"> Not Published </Badge>
                )

            }
            primaryAction={
                Booster?.status === "Published" ? (
                    { content: 'Unpublish', onAction: handlePublish, destructive: true }
                ) : (
                    { content: 'Publish', onAction: handlePublish }
                )

            }


            secondaryActions={
                [...updatedSecondaryActions]
            }
            fullWidth
        >
            <Layout>
                <Layout.Section>
                    <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                        {/* ProgressBar */}
                        <br></br>
                        <div className="legacy-card-container">
                            <LegacyCard>
                                <LegacyCard.Section title="Preview">
                                    <div className="progress-bar" style={{ backgroundImage: `url(${backgroundImage})` }}>
                                        <span className="progress-bar-fill" style={{
                                            width: "100%", fontSize: `${fontSize}px`, fontFamily: `${fontSelected}`,
                                            backgroundColor: `${cardColor}`, color: `${messageColor}`, backgroundImage: `url(${backgroundImage})`
                                        }} >
                                            {message.replace('{order-value}', goal)}
                                        </span>
                                        <span className="progress-bar-2">

                                        </span>
                                    </div>
                                </LegacyCard.Section>
                            </LegacyCard>
                        </div>
                        {/* End ProgressBar */}
                        <br></br>
                        <br></br>
                        <div className="content-container">
                            {panels[selected].content}
                        </div>



                    </Tabs>

                </Layout.Section>
            </Layout>
        </Page>

    );

}






