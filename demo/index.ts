/* tslint:disable */
import { ofUrl } from '../src/Dominant.bs';
async function showAvatar() {

  // read our JSON
  let response = await fetch('/user.json');
  let user = await response.json();

  // read github user
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // show the avatar
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // wait 3 seconds
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
async function dominantColors() {
  const dominantColors = await ofUrl('https://www.swapcard.com/');
  console.log('dominantColors are: ', dominantColors);
}

function component() {
  const element = document.createElement('div');
  dominantColors()
  // console.log('dominantColors are: ', dominantColors);

  element.innerHTML = 'Hello, SwapCard';

  return element;
}

document.body.appendChild(component());
