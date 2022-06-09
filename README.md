# Drag-and-drop board

Kanban board based on [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) technology.

<img width="1344" alt="image" src="https://user-images.githubusercontent.com/92833239/172754146-bbd5af04-a76f-4cd6-b5ab-03b2c1bd8273.png">

## Deployment
### Click [here](https://gagarin-one.github.io/Drag-and-Drop/) to view the deployment


![some](https://media.giphy.com/media/kD3qpN0pnc58KsAQoE/giphy.gif)
## Technologies
Project is created with:
  Create react app
* React version:18.1.0
* Redux 
* Redux-thunk
* Typescript
* Scss
* Axios
## Problems that have arisen
<img width="926" alt="image" src="https://user-images.githubusercontent.com/92833239/172647077-8904c542-4e64-4dcd-adcd-eeefc1431b72.png">
<p>I used the "Mock Api" as the server api. It has several conventions (it automatically sets the id for elements, which makes it difficult to find elements between different arrays), I had to do additional checks for additional ones when making requests to the server.</p>


```
for (let i = 0; i < getState().MainReducer.ShoppingCard.length; i++)
    {if(getState().MainReducer.ShoppingCard[i].data.ProductId === obj.data.ProductId){
      UpdateQuantityInShopCard(obj,getState().MainReducer.ShoppingCard[i].id)
        }
      }
    }
```

<p>In this project several elements are absolutely located (position: absolute), there was a difference when displaying elements in safari and chrome, which I solved for safari in the following way</p>	

```
@media not all and (min-resolution:.001dpcm)
{ @supports (-webkit-appearance:none) {
    .shop { 
      margin-top:clamp(100px, 25vw, 300px);
    }
}}
```

## Setup
To run this project, install it locally using npm:

```
$ cd ../Planterplaneter
$ npm install
$ npm start
```
