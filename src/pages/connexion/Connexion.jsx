import React from 'react'
import { useEffect } from "react";
import { Stack, TextField, Typography, Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


export default function Connexion() {

/**
 * Get le serveur envoie des données pour la vérification 
 * 
 * */
const navigate = useNavigate();
useEffect(() => {
  // Securiser les routages 
  // Si t"es connecté tu ne pourra plus revenir sur la page de connexion
  if (localStorage.getItem("utilisateur")) {
    navigate("/")
  }
  });
const {handleSubmit, register, formState: {errors} } = useForm();
  const onSubmit = (data) => {
    axios
      .get(`http://localhost:3000/utilisateur?mailUtilisateur=${data.mailUtilisateur}&motDePasse=${data.motDePasse}`)
      .then((res) => {
        if(res.data.length > 0) {
          // Ajout des données de l'uilisateur dans le navigateur
          localStorage.setItem("utilisateur", JSON.stringify(res.data[0]));
          navigate("/");
          toast.success("connexion reussie");
        } else {
          toast.error("Les identifiantts sont incorrecte");
        }
      })
    
  };
  return (
    <Stack 
      alignItems={"center"} 
      justifyContent={"center"}
      width={"100%"} height={"100vh"} backgroundColor={"#f5f5f5"}      >
      <Box
        width={400}
        sx={{
          backgroundColor: "#fff",
          padding: 3,
        }}
        >
        <Typography variant="h5">
          Connexion
        </Typography>

        {/* Création du formulaire d'inscription */}
        <form style={{
            marginTop: 4,
            }}
             onSubmit={handleSubmit(onSubmit)}
          >
          <Stack direction={"column"}
            gap={2}
            >
              {/* Création des input avec mui */}

            <TextField
              id="outlined-basic" 
              label="Veuillez saisir votre mail"
              variant="outlined"
              fullWidth
              size="small"
              type="email"
              {...register("mailUtilisateur", 
                  {required: "Veuillez saisir votre mail", 
                    pattern:  "/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3}+$/" 
                  }) }
            />

            <TextField
              id="outlined-basic" 
              label="Veuillez saisir un mot de passe"
              variant="outlined"
              fullWidth
              size="small"
              type="password"
              {...register("motDePasse", 
                  {required: "Veuillez saisir un mot de passe", 
                      minLength: {value: 6, message:"Veuillez saisir un mot de passe de plus de 6 caractères"
                }}) }
            />

          </Stack>

          {/* Création du botton */}
          <Button variant="contained"
            sx={{
              marginTop: 2,
            }}
            type="submit"
            >
              Connexion
          </Button>

          <Typography sx={{ marginTop: 1 }}>Avez vous un compte ? <Link to="/inscription">Inscrivez-vous</Link> </Typography>

        </form>
      </Box>
    </Stack>
  )
}
