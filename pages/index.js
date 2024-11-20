import React, { useRef, useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from "next/image";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards } from 'swiper/modules';

export default function App() {
  const canvasRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false); // Trạng thái phát nhạc
  const audioRef = useRef(null);

  useEffect(() => {
    // Đặt thời gian delay
    const delay = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play(); // Bắt đầu phát nhạc
        setIsPlaying(true); // Cập nhật trạng thái
      }
    }, 1000); // Delay 3 giây

    // Xóa timeout khi component bị unmount
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Cài đặt canvas kích thước ban đầu
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const snowflakes = [];
    const maxSnowflakes = 150;

    // Lớp bông tuyết
    class Snowflake {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1; // Kích thước bông tuyết
        this.speedX = Math.random() * 2 - 0.5; // Độ trôi ngang
        this.speedY = Math.random() * 1 + 1; // Tốc độ rơi
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.y > canvas.height) {
          this.y = -this.radius;
          this.x = Math.random() * canvas.width;
        }

        if (this.x > canvas.width || this.x < 0) {
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
      }
    }

    const createSnowflakes = () => {
      for (let i = 0; i < maxSnowflakes; i++) {
        snowflakes.push(new Snowflake());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      snowflakes.forEach((flake) => {
        flake.update();
        flake.draw();
      });

      requestAnimationFrame(animate);
    };

    createSnowflakes();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className='app-container'>
      
      <canvas
        ref={canvasRef}
        style={{
          pointerEvents: "none",
          backgroundColor: "transparent",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        data-testid="SnowfallCanvas"
      />
      <div class="header">
        <div id="heart">
        </div>
        <h1>Gửi người anh thương!!!</h1>
      </div>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        <SwiperSlide><div className='slide-container'>Hế nhô Hạnh iu</div></SwiperSlide>
        <SwiperSlide><div className='slide-container'>Hôm nay 20/11</div></SwiperSlide>
        <SwiperSlide><div className='slide-container'>Anh chúc em luôn mạnh khỏe, thành công</div></SwiperSlide>
        <SwiperSlide><Image
          src="/IMG_6043.JPEG"
          width={240} // Chiều rộng ảnh
          height={320} // Chiều cao ảnh
          className=''
        /></SwiperSlide>
        <SwiperSlide><div className='slide-container'>Mong em hãy mỉm cười</div></SwiperSlide>
        <SwiperSlide><div className='slide-container'>Luôn vui vẻ</div></SwiperSlide>
        <SwiperSlide><div className='slide-container'>Và đặc biệt là luôn iu thương anh</div></SwiperSlide>
        <SwiperSlide><div className='slide-container'>❤</div></SwiperSlide>
        <SwiperSlide><Image
          src="/IMG_0448.JPEG"
          width={240} // Chiều rộng ảnh
          height={320} // Chiều cao ảnh
          className=''
        /></SwiperSlide>
      </Swiper>
      <audio
        ref={audioRef}
        src="/music.mp3" // Đường dẫn nhạc
        loop
        // controls={false} // Không hiển thị điều khiển
        muted={false} // Không tắt tiếng
      />
    </div>
  );
}
