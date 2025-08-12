import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { blogPosts } from "../constant/Constant";

const Blog = () => {
    return (
        <div className="container mx-auto blog py-10">
            <div className="flex justify-between mb-6">
                <div className="flex flex-col items-start">
                    <h2 className="text-3xl font-bold">Blog</h2>
                    <div className="h-[2px] w-[50px] bg-green-700 mt-2" />
                </div>

                <a href="#" className="text-sm text-gray-500 hover:text-green-700">
                    View All Blog
                </a>
            </div>

            <Swiper
                spaceBetween={20}
                navigation
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                modules={[Navigation]}
            >
                {blogPosts.map((post, index) => (
                    <SwiperSlide key={index}>
                        <div className="blog-card bg-white rounded-md overflow-hidden">
                            <img src={post.image} alt={post.title} className="w-full h-52 object-cover" />
                            <div className="px-1 py-4">
                                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                                <p className="text-gray-600 text-sm">{post.description}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Blog;
