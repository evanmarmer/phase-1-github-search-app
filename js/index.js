document.addEventListener("DOMContentLoaded",function(){
    const form = document.querySelector("#github-form")

    const gitContainer = document.querySelector('#github-container')
    const userList = document.querySelector('#user-list')
    const repoList = document.querySelector('#repos-list')

    function renderRepo(userData){
        console.log(userData)
        userData.forEach(user=>{
            const repo = user.name
            console.log(repo)
            repoList.append(repo)
        })
    }


    function renderUsers(userData){
        userData.items.forEach(user=> {
            // console.log(userData)
            const userName = user.login
            const userAvatar = user.avatar_url
            const userProfile = user.html_url
            userList.append(userName, userAvatar, userProfile)
            userList.addEventListener('click', function onClick(event){
                // console.log(event)
                event.preventDefault()
                fetch(`https://api.github.com/users/${userName}/repos`)
                .then(res => res.json())
                .then(userData => renderRepo(userData))
            })
        })
    }

    form.addEventListener('submit',function(event){
        event.preventDefault()
        const search = document.querySelector("#search")
        // console.log(search.value)
        fetch(`https://api.github.com/search/users?q=${search.value}`)
        .then(res => res.json())
        .then(userData => renderUsers(userData))
    })

})

