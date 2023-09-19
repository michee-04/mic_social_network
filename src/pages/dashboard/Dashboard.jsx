import React from 'react'
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import  Box  from '@mui/material/Box';
import Navbar from "./Components/Navbar"
import AjouterPublication from './Components/AjouterPublication';
import  axios  from 'axios';
import { Stack, Typography, Avatar } from '@mui/material';
import { useQueryClient, useQuery } from "@tanstack/react-query";
import IconButton  from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CartPub from './Components/CartPub';



export default function Dashboard() {


  // Création d'une variable qui va permettre d'afficher les publications
  const [publication, setPublication] = useState([]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data:publications, error, isLoading } = useQuery({
    queryKey: ["publications"],
    queryFn: () => axios
                      .get("http://localhost:3000/publications")
                      .then((res) => res.data),
                      onerror: (error) => console.log(error),
  });
 
   // Si l'utilisateur n'est pas connecté, il ne pourra pas acceder a la page dashboard
   useEffect(() => {
    if (!localStorage.getItem("utilisateur")) {
      navigate("/connexion")
    }
    // Recupération des publications dans la variable publication
    axios.get("http://localhost:3000/publications").then((res) => {
      setPublication(res.data);
    })
  }, []);
  
  if (isLoading) {
    return <div>Chargement......</div>;
  }

  // Déclarations d'une variable qui va permetrre de trier et de rendre les evenements qui seront récent en haut dee page
  let pubTrier = publications.sort((a, b) => {
    return new Date(b.datePublication) - new Date(a.datePublication);
  })
 


  return (
    <Box backgroundColor={"#eef4ff"}>
      <Navbar author={publication && pubTrier.length > 0 ? pubTrier[0].auteur : ""} />
      <AjouterPublication />
      <Box width={"60%"} margin={"auto"} marginTop={4}>
        {publication && pubTrier.map((publication) => (
            <CartPub key={publication.id} publication={publication} />
          ))}

      </Box>
    </Box>
  )
}
