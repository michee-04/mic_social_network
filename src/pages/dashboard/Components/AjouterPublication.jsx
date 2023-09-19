import React from 'react'
import { Stack } from "@mui/material";
import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import  axios  from 'axios';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from "@tanstack/react-query";

/***
 * la methode reset ermet de supprimer le contenu des inputs après la publication
 */

export default function AjouterPublication() {
  const user = JSON.parse(localStorage.getItem("utilisateur"));
  const {
    handleSubmit,
     register, 
     reset, 
     formState: {errors} 
    } = useForm();

    const queryClient = useQueryClient();
    
    const mutation = useMutation({
      mutationFn: (pub) => {
        return axios.post("http://localhost:3000/publications", pub);
      },
      onError: (error) => {
        toast.error("Une erreur survenue")
      },
      onSuccess: () => {
        reset();
        // queryClient.invalidateQueries("publications"); permet d'invalider une requête de publications
        queryClient.invalidateQueries("publications");
        toast.success("Pulications ajoutée")
      }
    })


  const onSubmit = (data) => {
      const publication = {
        ...data,
        idUtilisateur: user.id,
        datePublication: new Date(),
        likePublication: 0,
        auteur: user.nomUtilisateur,
      };
      mutation.mutate(publication);
      /*
      axios
        .post("http://localhost:3000/publications", publication)
        .then((res) => {
          console.log(data);
          toast.success("Publication ajoutée");
          reset();
        }).catch((err) => {
        console.log(err);
        toast.error("Une erreur est survenue")
        })
      */
  }
  return (
    <Stack width={"60%"} margin={"auto"}>
        <h1>Ajouter une publication</h1>
        <form style={{
          marginTop: 2,
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack gap={2}>
          <TextField 
                id="fillled-basic"
                label="Parlez nous de votre oournée"
                variant="outlined"
                fullWidth
                size="small"
                type="text"
                multiline
                  rows={4}
                  {...register("textPublication", 
                  {required: "Veuillez saisir un texte", 
                      minLength: {
                        value: 10,
                        message:"Veuillez saisir un texte de plus de 10 caractères"
                }}) }
            />

            <TextField 
                id="fillled-basic"
                label="Veuillez saisir l'url de votre image"
                variant="outlined"
                fullWidth
                size="small"
                type="text"
                {...register("imagePublication", 
                  {required: "Veuillez saisir une url", 
                      }) }

            />
            <Button variant="contained" type="submit">
              Publier
            </Button>
          </Stack>
        </form>
    </Stack>
  )
}
