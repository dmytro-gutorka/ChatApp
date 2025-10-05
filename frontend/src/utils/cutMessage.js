export default function cutMessage(message) {
    return message?.split(' ').slice(0, 20).join(' ') + '...'
}