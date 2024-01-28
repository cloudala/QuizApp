export default function ToastContent({ emojiUrl, user, quizTitle }) {
    console.log(emojiUrl.emojiCode);
    return (
        <span className="flex items-center">
            <div>
            <span className='font-semibold text-l'>{emojiUrl.user.name} reacted to "{emojiUrl.quizTitle}"</span>
            </div>
            <img alt="Emoji" style={{ width: '30px'}} src={emojiUrl.emojiCode} />
        </span>
    )
}