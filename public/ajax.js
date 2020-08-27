/*
 * @Author: veni
 * @Date: 2020-03-28 16:40:54
 * @LastEditors: veni
 * @LastEditTime: 2020-03-29 17:28:08
 * @Description: 
 */

class ParmasError extends Error {
    constructor(msg) {
        super(msg);
        this.name = '请求错误'
    }
}

class HttpError extends Error {
    constructor(msg) {
        super(msg);
        this.name = '结果失败'
    }
}

function ajax(url, parmas, token) {
    if (!/^http/.test(url)) {
        throw new ParmasError('非HTTP请求');
    }
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("post", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", token);
        data = JSON.stringify(parmas);
        xhr.send(data);
        xhr.onload = function () {
            const response = this.response;
            const currentRes = JSON.parse(response);
            if (currentRes.code == 200) {
                resolve(this.response)
            } else if (currentRes.code == 202) {
                // 这里不能直接throw一个错误，因为是异步，所以要用reject的形式
                reject(new HttpError('密码错误'))
            } else {
                reject('加载失败');
            }
        }
        xhr.onerror = function () {
            reject('失败')
        }
    })
}
