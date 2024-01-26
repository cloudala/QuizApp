export default function ToastContent({ emojiUrl }) {
    return (
        <span className="flex items-center">
            <h1 className="mr-2 font-normal text-black">New user reaction:</h1>
            <img alt="Emoji" style={{ width: '30px'}} src={emojiUrl} />
        </span>
    )
}