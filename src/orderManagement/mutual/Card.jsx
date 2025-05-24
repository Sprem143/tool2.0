
import { motion } from "framer-motion";
import '../../App.scss'
import { useState } from "react";
export default function Card({ cards }) {

    return (
        <>
            <div className="container w-100">
                <div className="row mt-4 d-flex align-items-center justify-content-center">
                    {Array.isArray(cards) && cards.map((card, index) => (
                        <div className="col-md-2 col-sm-6">
                            <motion.div
                                key={card.id}
                                initial={{ opacity: 0, x: -80 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                whileHover={{ scale: 1.05 }}
                                className="cardboard  bg-gray-800 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
                                style={{ placeItems: 'center' }}
                            >
                                <h4 className="text-2xl font-bold mb-2">{card.title}</h4>
                                <span>{card.sub}</span>
                                <div className="d-flex justify-content-evenly align-items-center w-100">
                                    <img src={card?.img} alt="" width='70' />
                                    <h3 className="text-gray-400 fw-bolder">{card.description}</h3>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>

            </div>

        </>
    )
}