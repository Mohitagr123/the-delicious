import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import React from 'react'

function Recipe() {

  let params = useParams();
  const [details, setDetails] = useState();
  const [activeTab, setActiveTab] = useState("instructions");


  const fetchDetails = async () => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
    const detailData = await data.json();
    setDetails(detailData);
    console.log(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <>
      <DetailWrapper>
      {details?.title &&(
        <div style={{display:"flex" , justifyContent:"center" , flexDirection:"column"}}>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>
      )}
      
      
      </DetailWrapper>
      <Info style={{marginBottom:"5rem"  }}>
      <Button 
          className={activeTab === "instructions" ? "active" : ""} 
          onClick={() => setActiveTab("instructions")}
          style={{cursor:"pointer"  }}

          >
            Instructions
      </Button>
      <Button 
           className={activeTab === "ingredients" ? "active" : ""} 
           onClick={() => setActiveTab("ingredients")}
           style={{cursor:"pointer"}}
           >
            Ingredients
      </Button>
      <div style={{marginTop:"1rem"}}>
      {details && activeTab === 'instructions' && (
          <div>
          <p dangerouslySetInnerHTML={{__html: details.summary }}></p>
          <p dangerouslySetInnerHTML={{__html: details.instructions }}></p>
        </div>
      )}
      {details && activeTab === 'ingredients' && details.extendedIngredients && (
            <ul>
            {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
      )}
      </div>
        
    </Info>
    </>
    
  );
}

const DetailWrapper = styled.div`
  margin-top: 2rem;
  margin-bottom: 1rem;
  display: flex;
  .active{
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2{
    margin-bottom:2rem ;
  }
  li{
     font-size: 1.2rem;
     line-height: 2.5rem;

  }
  ul{
    margin-top: 2rem;
  }
 
`;

const Button = styled.button`

 padding: 1rem 2rem;
 color: #313131;
 background: white;
 border-radius: 1rem;
 border: 2px solid black;
 margin-right: 2rem;
 font-weight: 600;
 &:hover {
  
  cursor: pointer;
  background: black;
  color: white;
 
}
`;

const Info = styled.div`
  

`

export default Recipe;
