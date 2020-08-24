module.exports = async function HandleError(context, props) {
    console.error(props.error);
    if (!context.isReplied) {
        await context.replyText(
            'There are some unexpected errors happened. Please try again later, sorry for the inconvenience.'
        );
    }
};
