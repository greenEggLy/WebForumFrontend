export const isLogin = () => {
    if(!localStorage.getItem('accessToken')){
        return false
    }
    const now = new Date()
    const expireTime = new Date(localStorage.getItem('expire') || '')
    console.log(now.getTime(), expireTime.getTime())
    return now.getTime() < expireTime.getTime()
}