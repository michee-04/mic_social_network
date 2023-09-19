import React from 'react'
import  Box  from '@mui/material/Box';
import { Stack, Typography, Avatar } from '@mui/material';
import IconButton  from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios  from 'axios';
import { toast } from 'react-hot-toast';



export default function CartPub({publication}) {

    // déclaration d'une variable pour voir lutilisateur qui est connéctée
    const user = JSON.parse(localStorage.getItem("utilisateur"));
    const useQuery = useQueryClient();
    const mutation = useMutation({
        mutationFn: (id) => {
            return axios.delete(`http://localhost:3000/publications/${id}`);
        },
        onError: (error) => {
            toast.error("Une erreur survenue")
          },
          onSuccess: () => {
            useQuery.invalidateQueries("publications");
            toast.success("Pulications supprimée avec success")
          }
    })
    const supprimerPublication = (id) => {
        mutation.mutate(id); 
    }
  return (
    <Box key={publication.id} 
        width={"93%"} 
        backgroundColor={"#ffff"} 
        borderraduis={4} 
        padding={3}
        marginBottom={3} 
        >
        <Stack direction={"row"} alignItems={"center"} gap={2} >
            {/* Avatar permet d'afficher l'utilisateur où le texte ou sa photo */}
            <Avatar src={publication.photoUtilisateur} />
            <Typography>{publication.auteur}</Typography>

            {
                user.id === publication.idUtilisateur &&
                    <IconButton 
                        aria-label="delete"
                        onClick={()=> supprimerPublication(publication.id)}
                        >
                        <DeleteIcon />
                    </IconButton>
            }

            
        </Stack>
            <Typography>{publication.textPublication}</Typography>
            <img src={publication.imagePublication} alt={`Image de ${publication.auteur}`} style={{
                 width: "100%" ,
                 borderraduis: 4,
                 }} />
    </Box>
  )
}
