const authentication =  { 
    username: "2ec18342f3c0b1d570db", 
    password: "4be208722b9683325b7b9c62ed1bace6685a98dc",
}

export const baseUrl = 'https://api.github.com/users/'

export const userRequest = {
    method: 'get',
    url: '',
    auth:authentication
}


export function pageLoader(page, loadFirst, loadOthers) {
    if(page <= 1){
        return loadFirst
    } 
    else {
        return loadOthers
    }
}

//console.log(pageLoader(1, a(1),b(1)))