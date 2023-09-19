import React from 'react'
import { Stack, TextField, Typography, Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Inscription() {

/**
 * Si l''utilisateur est déjà connectée alors elle sera rédiriger vers la page dashboard grâce a navigate
 *   handleSubmit est lancé quand le formulaire est envoyée
 * register permet d'enregistrer les differents input
 * formState: {errors} permet de stocker les erreurs 
 * onSubmit fonction de validation de formulaire
 * Post envoie des oonnées au serveur
 * Get le serveur envoie des données pour la vérification
 * */
const navigate = useNavigate();
const {handleSubmit, register, formState: {errors} } = useForm();
  const onSubmit = (data) => {
    if(data.motDePasse !== data.motDePasseConfirm) {
      toast.error("Les mots de passe ne correspondent pas");
    } else {
      // Vérification que l'utilisateur n'existe pas dans la base de données
      axios
        .get(`http://localhost:3000/utilisateur?mailUtilisateur=${data.mailUtilisateur}`)
        .then((res) => {
        if (res.data.length > 0) {
          toast.error("Un compte existe déjà avec cet adresse email");
        } else {
          // Envoi des données grâce a axios
          axios
            .post("http://localhost:3000/utilisateur", data)
            .then((res) => {
            console.log(res);
            toast.success("Inscription reussi")
            navigate("/connexion")
          }).catch ((err) => {
            console.log(err);
          toast.error("Une erreur est survenue");
          })
        }
      })
      
    }
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
          Inscription
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
              label="Veuillez saisir votre nom"
              variant="outlined"
              fullWidth
              size="small"
              {...register("nomUtilisateur", 
                  {required: "Veuillez saisir un nom", 
                      minLength: {value: 5, message:"Veuillez saisir un nom de plus de 5 caractères"
                }}) }
            />

            <TextField
              id="outlined-basic" 
              label="Veuillez saisir votre prénom"
              variant="outlined"
              fullWidth
              size="small"
              {...register("prenomUtilisateur", 
                  {required: "Veuillez saisir un prénom", 
                      minLength: {value: 5, message:"Veuillez saisir un prénom de plus de 5 caractères"
                }}) }
            />

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

            <TextField
              id="outlined-basic" 
              label="Veuillez confirmer le mot de passe"
              variant="outlined"
              fullWidth
              size="small"
              type="password"
              {...register("motDePasseConfirm", 
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
              Inscription
          </Button>

        </form>
      </Box>
    </Stack>
  )
}
