export default function useWebSocket (handleMessage:(e:any)=>void) {
	const ws = new WebSocket("ws://localhost:8000")
	function bindEvent () {
		ws.addEventListener('open',handleOpen)
		ws.addEventListener('close',handleClose)
		ws.addEventListener('error',handleError)
		ws.addEventListener('message',handleMessage)
	}
	 
	function handleOpen () {
		console.log('open')
	}
	function handleClose () {
		console.log('close')
	}
	function handleError () {
		console.log('err')
	}
    
    bindEvent ()

	return ws
}