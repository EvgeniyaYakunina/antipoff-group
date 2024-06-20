import axios from "axios";

const instance = axios.create({
    baseURL: 'https://reqres.in/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

export const usersAPI={
    getUsers(){
        return instance.get(`/users?page=1&per_page=12`)
    },
    getUsersId(id: number){
        return instance.get(`/users/${id}`)
    }
}

export const authAPI={
    register(email: string, password: string){
        return instance.post(`/register`, {email, password})
    },
    logout(){
        return instance.post('/logout')
    },
    login(email: string, password: string){
        return instance.post('/login', {email, password});
    }
}