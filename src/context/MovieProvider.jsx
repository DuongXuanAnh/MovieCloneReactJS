import React from 'react';
import { createContext } from "react";
import Modal from "react-modal";
import YouTube from "react-youtube";

const MovieContext = createContext();

const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

const MovieProvider = ({ children }) => {

    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [trailerKey, setTrailerKey] = React.useState('');

    const handlerTrailers = async (id) => {

        setTrailerKey('');

        try{
            const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
                }
              };
    
              const movieKey = await fetch(url, options);
              const data = await movieKey.json();
    
              setTrailerKey(data.results[0].key);
              setModalIsOpen(true);
        }catch(err){
            setModalIsOpen(false);
            console.error(err);
        }

        
    }

  return (

        <MovieContext.Provider value={{ handlerTrailers }}>

        {children}

        <Modal
            isOpen={modalIsOpen}
            onRequestClose={setModalIsOpen.bind(this, false)}
            style={{
            overlay: {
                position: "fixed",
                zIndex: 9999,
            },
            content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
            },
            }}
            contentLabel="Example Modal"
        >
            {trailerKey && (
            <div className="flex items-center justify-center mt-5">
                <YouTube videoId={trailerKey} opts={opts} />
            </div>
            )}
        </Modal>
        </MovieContext.Provider>
  )
}

export { MovieProvider, MovieContext };