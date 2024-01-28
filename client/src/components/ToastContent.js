export default function ToastContent({ emojiUrl, user, quizTitle }) {
    console.log(emojiUrl.emojiCode);
    return (
        <span className="flex items-center">
            <div>
            <span className='font-semibold text-l'>User: {emojiUrl.user.name} reacted to Quiz: "{emojiUrl.quizTitle}" with:</span>
            </div>
            <img alt="Emoji" style={{ width: '30px'}} src={emojiUrl.emojiCode} />
        </span>
    )
}