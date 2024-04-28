const backendUrl = 'http://localhost:3001'
// navigator.geolocation.getCurrentPosition((position) => {
//   const latitude = position.coords.latitude;
//   const longitude = position.coords.longitude;
//   // 根据经纬度获取国家信息
//   const country = getCountryFromCoordinates(latitude, longitude);
//   document.getElementById("country").textContent = `Country: ${country}`;
// });

// function getCountryFromCoordinates(latitude, longitude) {
//   // 根据经纬度向地图 API 发送请求，获取国家信息
//   // 这里可以使用第三方地图服务或者自己搭建的地图服务
//   // 示例：假设使用第三方地图服务 GeoNames
//   const API_KEY = "YOUR_API_KEY";
//   const url = `http://api.geonames.org/countryCodeJSON?lat=${latitude}&lng=${longitude}&username=${API_KEY}`;
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       return data.countryName;
//     })
//     .catch((error) => {
//       console.error("Error fetching country:", error);
//       return "Unknown";
//     });
// }


// // 获取当前页面的 URL
// const url = window.location.href;
// // 从 URL 中提取文章 ID
// const article_id = url.substring(url.lastIndexOf('/') + 1);




function truncateDescription(description, maxLength) {
  // 使用空格将描述拆分为单词数组
  const words = description.split(' ');

  // 如果描述的单词数量小于等于maxLength，则返回原始描述
  if (words.length <= maxLength) {
    return description;
  } else {
    // 否则，截取前maxLength个单词并将其重新组合
    const truncatedWords = words.slice(0, maxLength);
    return truncatedWords.join(' ') + '...'; // 添加省略号
  }
}


const renderingMyPosts = (postsData) =>{
  // const postCardContainer = document.getElementById("myposts");
  myPostsCardGroup.innerHTML = ''; // Clear existing content
  // 遍历 postdata 数组，为每个对象创建卡片并添加到容器中
  const myPostsCardGroup = document.getElementById('myPostsCardGroup');
  postsData.forEach(post => {
    const cardHTML = `
      <div class="card col-12 col-md-6 col-lg-4 mb-4">
        <img src="./img/chicken-satay-salad-8f5b068.webp" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.description}</p>
          <div class="more">
            <a href="#">
              <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i> More >> 
            </a>
          </div>
        </div>
      </div>
    `;
    myPostsCardGroup.insertAdjacentHTML('beforeend', cardHTML);
    
     

  // // 创建卡片元素
  //   const card = document.createElement("div");
  //   card.classList.add("card");

  //   // 创建卡片图片元素
  //   const img = document.createElement("img");
  //   img.classList.add("card-img-top");
  //   img.src = post.image;

  //   // 创建卡片主体元素
  //   const cardBody = document.createElement("div");
  //   cardBody.classList.add("card-body");

  //   // 创建标题元素
  //   const title = document.createElement("h4");
  //   title.classList.add("card-title");
  //   title.textContent = post.title;

  //   // 创建描述元素
  //   const description = document.createElement("p");
  //   description.classList.add("card-text");
  //   description.textContent = truncateDescription(post.description, 30);

  //   // 创建查看按钮元素
  //   const link = document.createElement("a");
  //   link.href = "Back";
  //   link.classList.add("btn", "btn-primary");
  //   link.textContent = "查看";

  //   // 将图片、标题、描述和按钮添加到卡片主体中
  //   cardBody.appendChild(title);
  //   cardBody.appendChild(description);
  //   cardBody.appendChild(link);

  //   // 将图片和卡片主体添加到卡片中
  //   card.appendChild(img);
  //   card.appendChild(cardBody);

  //   // 将卡片添加到容器中
  //   postCardContainer.appendChild(card);
  });
}

const createNoFoundItem = () => {
  // create card header
  const headerContainer = document.createElement("div");
  headerContainer.className = "card-header";
  // header row
  const headerRow = document.createElement("div");
  headerRow.className =
    "row  d-flex justify-content-between align-items-center";
  const NoFoundText = document.createElement("span");
  NoFoundText.className = "card-text text-center";
  NoFoundText.textContent = "No post found";
  // append to header row
  headerRow.appendChild(NoFoundText);
  headerContainer.appendChild(headerRow);
  const postItem = document.createElement("div");
  postItem.className = "card border border-2 border-dark rounded-3";
  postItem.appendChild(headerContainer);
  return postItem;
};


const getUserData = async () => {
  const account_id = 2 // 这里替换为您想要获取的 post_id
  try {
      const response = await fetch(`${backendUrl}/user/${account_id}`);
      const userData = await response.json();
      console.log(userData);
      renderingMyInf(userData);
      
  } catch (error) {
      console.log(error.message);
  }
};

const getPostData = async () => {
  const account_id = 2 // 这里替换为您想要获取的 post_id
  try {
      const response = await fetch(`${backendUrl}/account/${account_id}`);
      const postsData = await response.json();
      console.log(postsData);
      renderingMyPosts(postsData);
      
  } catch (error) {
      console.log(error.message);
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  // //获取当前页面的 URL
  // const url = window.location.href;
  // // 从 URL 中提取文章 ID
  // const postId = url.substring(url.lastIndexOf('/') + 1);
  // // 获取文章数据
  // const postData = new posts(backendUrl,`/posts/${postId}`);
  // 渲染文章内容
  
  // renderPostPage(postData);
  getPostData(account_id)
  // renderingStars(postData.rate);
  // 渲染轮播图
  //renderCarousel(postData.photos);
});