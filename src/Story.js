import React from "react";

const DEFAULT_PLACEHOLDER_IMAGE =
    "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";


const Story = ({ story }) => {
    const poster =
        story.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : story.Poster;
    return (
        <div className="story">
            <h2>{story.Title}</h2>
            <div>
                <img
                    width="200"
                    alt={`The story titled: ${story.Title}`}
                    src={poster}
                />
            </div>
            <p>({story.Year})</p>
        </div>
    );
};


export default Story;