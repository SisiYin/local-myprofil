
// window.history.pushState(null, '', '/post/1');

//import { Posts } from "./modules/posts";
// import { renderingMyPosts } from "./modules/renderingPosts.js";
// import {
//   registration,
//   login,
//   logout,
//   loginStatusIsValid,
// } from "./modules/eventHandling.js";

const backendUrl = 'http://localhost:3001';
const stars = document.getElementsByClassName("stars")[0]
const icons = document.querySelectorAll(".stars .fa-star")
let vote = 0
const score = document.getElementById("score")
const submitRate = document.getElementById("submitButton")
score.innerText = vote

const commentForm = document.getElementById('commentForm');
const commentInput= document.getElementById('comment');
const textarea = document.querySelector('textarea')
const useCount = document.getElementById('useCount')

// //获取当前页面的 URL
// const url = window.location.href;
// // 从 URL 中提取文章 ID
// const postId = url.substring(url.lastIndexOf('/') + 1);

const getPostByPostId = async () => {
  const postId = 2; // 这里替换为您想要获取的 post_id
  try {
      const response = await fetch(`${backendUrl}/posts/${postId}`);
      const postData = await response.json();
      console.log(postData);
      return postData;
  } catch (error) {
      console.log(error.message);
  }
};

const getCommentsByPostId = async () => {
  const postId = 2; // 这里替换为您想要获取的 post_id
  try {
      const response = await fetch(`${backendUrl}/posts/${postId}/comments`);
      const commentsData = await response.json();
      console.log(commentsData);
      return commentsData;
  } catch (error) {
      console.log(error.message);
  }
};



const renderingComments = (commentsData) => {
  const commentsCardGroup = document.getElementById('commentsCardGroup');
  

  commentsData.forEach(comment => {
    const cardHTML = `
    <div class="card col-12 mb-2">
      <div class="card-body d-flex mt-2">
        <div class="col-lg-3 col-md-3 col-sm-3 text-lg-right text-md-right text-sm-right">
          <img src="./img/1714268312304.jpg" class="mb-2 rounded-circle" width="50">
        </div>
        <div class="col-9 px-3">
          <h6 class="card-title">${comment.username}</h6>
          <p class="card-text" style="color: #777;font-size: 12px;">${timeSince(comment.date)}</p>
        </div>
      </div>
      <div class="card-body mb-2">
        <p class="card-text">${comment.comment}</p>
      </div>
    </div>
    `;
    commentsCardGroup.insertAdjacentHTML('beforeend', cardHTML);
  });
};






// stars.addEventListener("click",async function(event) {
//   vote = 0
//   for (let i = 0; i < 5; i++) {
//     icons[i].style.setProperty("--v",0)
//     if (icons[i] == event.target) {
//       vote = i
//       for (let j = 0; j < i; j++) {
//         icons[j].style.setProperty("--v",100)
//       }
//       let ps = event.clientX - icons[i].getBoundingClientRect().left
//       if (ps/icons[i].offsetWidth < 0.5) {
//         icons[i].style.setProperty("--v",50)
//         vote += 0.5
//       } else {
//         icons[i].style.setProperty("--v",100)
//         vote++
//       }
//     }
    
//   }
//   score.innerText = vote.toFixed(1);
  

  
//   try {
//     const response = await saveStars(vote);
//     console.log(vote);
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
//   //window.location.href = 'avg_stars.html'
// })
// 新的点击事件处理函数
stars.addEventListener("click", async function(event) {
  renderingVote();
});

submitRate.addEventListener("click",async function(event) {
  location.reload();
})



// rendering stars when rating
async function renderingVote() {
  vote = 0;
  for (let i = 0; i < 5; i++) {
    icons[i].style.setProperty("--v", 0);
    if (icons[i] == event.target) {
      vote = i;
      for (let j = 0; j < i; j++) {
        icons[j].style.setProperty("--v", 100);
      }
      let ps = event.clientX - icons[i].getBoundingClientRect().left;
      if (ps / icons[i].offsetWidth < 0.5) {
        icons[i].style.setProperty("--v", 50);
        vote += 0.5;
      } else {
        icons[i].style.setProperty("--v", 100);
        vote++;
      }
    }
  }
  score.innerText = vote.toFixed(1);

  try {
    const response = await saveStars(vote);
    console.log(vote);
    // console.log(response);
  } catch (error) {
    console.error(error);
  }
  //window.location.href = 'avg_stars.html'
}

//console.log(postId)




  //const localToken = localStorage.getItem("token");
  // const searchParams = new URLSearchParams(window.location.search);
  // const post_id = '2';
  // const pageInf = new posts(backendUrl, `posts/${post_id}`);
  // console.log(pageInf)
  // renderingMyPosts(postData);
  // loginStatusIsValid(localToken, backendUrl);
  // registration(backendUrl);
  // login(backendUrl);
  // logout();
// // });
const renderPostPage = (postData) => {
  
  const author = document.getElementById('author');
  author.textContent = postData[0].username;

  const averageScore = document.getElementById('averageScore');
  averageScore.innerHTML = postData[0].rate;

  const title = document.getElementById('postTitle');
  title.textContent = postData[0].title;

  const postContent = document.getElementById('postContent');postContent.textContent = postData[0].description

  const time = document.getElementById('date')
  time.textContent = timeSince(postData[0].date);

  const commentsNum = document.getElementById('commentsNum')
  commentsNum.textContent = `Comments List (${postData[0].comment_num})` ;
  
//   // postData.description.forEach(descriptionItem => {
//   //   const listItem = document.createElement('li');
//   //   listItem.textContent = descriptionItem;
//   //   postContentElement.appendChild(listItem);

//   // // 渲染其他内容，比如作者、日期等，根据需要进行相应处理
//   // });
}

const timeSince = (date) =>{
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
      return `${interval} years ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
      return `${interval} months ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
      return `${interval} days ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
      return `${interval} hours ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
      return `${interval} minutes ago`;
  }
  // return `${Math.floor(seconds)} seconds ago`;
  return ('just now');
}




//comment input
commentForm.addEventListener('submit',async function(event) {
  try {
    event.preventDefault()
    const response = await saveComment(commentInput.value);
    console.log(response);
    commentInput.value = '';
    useCount.innerText = 0;
    commentInput.focus();
    location.reload(); 
    // addCommentToPage(commentInput.value);
  } catch (error) {
    console.error(error);
  }
    
})

commentInput.addEventListener('input',function () {
  useCount.innerText = commentInput.value.length
})

const saveComment = async (comment) => {
  try {
    const response = await fetch(backendUrl + '/newcomment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        post_id: 2,
        account_id:2,
        comment:comment,
        date:new Date()
      })
    });
    return response.json();
  } catch (error) {
    alert("Error saving stars: " + error.message);
  }
};







// saveStars.addEventListener("submit",(event)=>{
//   //console.log(article_id);
//   // window.location.href = 'rate.html'
//   window.location.reload()
  
// })

const saveStars = async (vote) => {
  try {
    const response = await fetch(backendUrl + '/newrate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        post_id:2,
        rate:vote 
      })
    });
    return response.json();
  } catch (error) {
    alert("Error saving stars: " + error.message);
  }
};

const renderingStars = async (avgStars) => {
  const starIcons = document.querySelectorAll('.avgStars .fa-star');

  for (let i = 0; i < starIcons.length; i++) {
    if (avgStars >= i + 1) {
      starIcons[i].classList.add('rated');
      starIcons[i].classList.remove('half-rated');
    } else if (avgStars > i) {
      starIcons[i].classList.add('half-rated');
      starIcons[i].classList.remove('rated');
    } else {
      starIcons[i].classList.remove('rated');
      starIcons[i].classList.remove('half-rated');
    }
  }

}

document.addEventListener("DOMContentLoaded", async () => {
  // //获取当前页面的 URL
  // const url = window.location.href;
  // // 从 URL 中提取文章 ID
  // const postId = url.substring(url.lastIndexOf('/') + 1);
  // // 获取文章数据
  // const postData = new posts(backendUrl,`/posts/${postId}`);
  // 渲染文章内容
  
  // renderPostPage(postData);
  const postData = await getPostByPostId();
  renderPostPage(postData);
  renderingStars(postData[0].rate);
  console.log(postData);
  console.log(postData[0].rate);
  const commentsData = await getCommentsByPostId();
  renderingComments(commentsData);
});
