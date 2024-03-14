import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import './Css/Categories.css';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { Context } from '../Context/Context';

    const images = [
    {
        url: 'https://basecamplive.com/wp-content/uploads/2023/02/books.jpeg',
        title: 'Literature',
        width: '30%',
    },
    {
        url: 'https://www.loretocavan.ie/images/SubjectsImages/history1.jpg',
        title: 'History',
        width: '30%',
    },
    {
        url: 'https://st.depositphotos.com/1003345/1883/i/450/depositphotos_18832325-stock-photo-magnifying-glass-and-map.jpg',
        title: 'Geography',
        width: '30%',
    },
    {
        url: 'https://www.labnews.co.uk/files/assets/image/2187099/7%20Physics%20competition_web.jpg',
        title: 'Physics',
        width: '30%',
    },
    {
        url: 'https://media.skilldeer.com/550x450/230ee8bd0814157509a5ce94c645f89bc7a9e419.png',
        title: 'Art',
        width: '30%',
    },
    {
        url: 'https://i0.wp.com/cms.babbel.news/wp-content/uploads/2022/05/Spanish_UpsideDown_Punctuation.png',
        title: 'Random',
        width: '30%',
    },
    ];

    const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
        width: '100% !important', 
        height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
        opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
        opacity: 0,
        },
        '& .MuiTypography-root': {
        border: '4px solid currentColor',
        },
    },
    }));

    const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    });

    const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
    }));

    const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
    }));

    const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
    }));

    export default function ButtonBaseDemo() {

        const navigate = useNavigate();
        const { questions, setQuestion } = useContext(Context);


        const filterQuestions= (category) => {
            const fileteredQuestionsarr= []
            questions.map((element)=> {
                if(element.category===category) {
                    fileteredQuestionsarr.push(element);
                    setQuestion(fileteredQuestionsarr)
                }
            })
            navigate(`/quiz`)
        }


        return (
            <Box className="categories" sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
            {images.map((image) => (
                <ImageButton
                    focusRipple
                    key={image.title}
                    style={{
                        width: image.width,
                    }}
                    onClick={() => filterQuestions(image.title)
                    }
                >
                <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                    <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                        position: 'relative',
                        p: 4,
                        pt: 2,
                        pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    }}
                    >
                    {image.title}
                    <ImageMarked className="MuiImageMarked-root" />
                    </Typography>
                </Image>
                </ImageButton>
            ))}
            </Box>
        );
        }