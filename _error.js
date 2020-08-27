module.exports = async function HandleError(context, props) {
    console.error(props.error);
    if (!context.isReplied) {
        await context.replyText(
            '對不起唷~ 我需要多一點時間來處理 Q_Q\nThere are some unexpected errors happened. Please try again later, sorry for the inconvenience.'
        );
    }
};
