
export function warnMsg(msg: string) {
    return {
        success: false,
        data: null,
        errorMessage: msg,
        showType: 1,
    }
}

export function errorMsg(msg: string) {
    return {
        success: false,
        data: null,
        errorMessage: msg,
        showType: 2,
    }
}