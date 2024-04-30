import React, { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "react-loading-skeleton/dist/skeleton.css";
import "../embla.css";
import "swiper/css";
import "swiper/css/pagination";
import Box from "@mui/material/Box";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar } from "swiper/modules";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { FaWineBottle } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";

export default function ServicesSection(props) {
  const [services, setServices] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // Utilizzando le proprie di props per slides e options se necessario
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  useEffect(() => {
    fetch("https://hunt4taste.it/api/services")
      .then((response) => response.json())
      .then((data) => {
          const filteredServices = data.filter(service => service.user_id === 7);
          setServices(filteredServices);
          console.log(filteredServices);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);


  const styles = {
    card: {
      maxWidth: isMobile ? 100 : 130, // 100px on mobile, 130px otherwise
      margin: "auto",
    },
    media: {
      height: 0,
      paddingTop: "100%", // Aspect ratio 1:1
    },
    title: {
      textAlign: "center",
      // Other styling based on your design
    },
  };

  return (
    <Box sx={{ mt: 5, mb: 5, ml: 2 }}>
   
      <Swiper
        className="mySwiper h-full"
        slidesPerView={1}
        spaceBetween={30}
        pagination={{ clickable: true }}
        breakpoints={{
          100: {
            slidesPerView: 2.3,
            spaceBetween: 20,
          },
          320: {
            slidesPerView: 2.2,
            spaceBetween: 60,
            height: "80px",
          },
          550: {
            slidesPerView: 3.2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3.5,
            spaceBetween: -30,
          },
          900: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1000: {
            slidesPerView: 6,
            spaceBetween: 200,
          },
          1500: {
            slidesPerView: 5,
            spaceBetween: 260,
          },
        }}
        modules={[Scrollbar]}
      >
         {services.length > 0 ? services.map((item, index) => (
          <Box key={index} sx={{ m: 1 }}>
            <SwiperSlide>
            <Link href={`/servizi/${item.id}`} passHref>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  bgcolor: "background.paper",
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: 3,
                  width: {
                    xs: 180,
                    sm: 180,
                    md: 180,
                    lg: 200,
                    xl: 280,
                  }, // Square size
                  height: {
                    xs: 180,
                    sm: 180,
                    md: 180,
                    lg: 200,
                    xl: 280,
                  }, // Square size
                }}
              >
                <Box
                  component="img"
                  sx={{
                    width: "100%",
                    height: "100%", // Fill the square
                    objectFit: "cover", // Maintain aspect ratio
                  }}
                  src={item.image}
                  alt={item.title}
                />
              </Box>
              <Typography
                variant="subtitle1"
                color="secondary"
                sx={{
                  p: 1,
                  textAlign: "left",
                  width: "100%",
                  color: "#7B7C7C",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  minWidth: `${item.title.length * 15}px`
                }}
              >
                {item.title.toUpperCase()}
              </Typography>
              </Link>
            </SwiperSlide>
          </Box>
        )): (
          <Skeleton count={7} />
        )}
      </Swiper>
    </Box>
  );
}
