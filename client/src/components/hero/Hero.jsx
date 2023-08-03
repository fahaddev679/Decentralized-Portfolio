import React, { useEffect, useState} from 'react'
import { Modal, ModalBody, Row } from "reactstrap"
import heroImg from '../../assets/hero-img.png'
import './Hero.css'

const Hero = ({state}) => {
    const [modal, setModal] = useState(false);
    const [description, setDescription] = useState("");
    const [cid, setCid] = useState("");

    useEffect(()=>{
        const {contract} = state;
        const description = async()=>{
            const descriptionText = await contract.methods.description().call();
            setDescription(descriptionText);
        }
        contract && description();
    }, [state]);

    useEffect(()=>{
        const {contract} = state;
        const cidOfImg = async()=>{
            const cid = await contract.methods.imageLink().call();
            setCid(cid);
        }
        contract && cidOfImg();
    }, [state]);
    return (
        <section className="hero">
        <div className="container">
            <div className="hero-text">
                <p><span>Muhammad Fahad<br/></span>
                    A full-stack blockchain developer from Pakistan.</p>
                <h1>I develop decentralized apps in Web3 space.</h1>
                <h3>{description}</h3>
                <br/>
                <h2>For contact: blockdevwithfahad@yahoo.com</h2>
                {/*  =========popup bootstrap==========  */}

                
                <Modal size='md' isOpen={modal} toggle={() => setModal(!modal)}>
                    <ModalBody>
                            <Row className="text-align">
                                <label htmlFor="" toggle={() => setModal(!modal)}>
                                    Mail Id - blockdevwithfahad@yahoo.com
                                </label>

                            </Row>
                    </ModalBody>
                </Modal>

                {/*<button className="msg-btn" onClick={() => setModal(true)}>Get in Touch</button>*/}
                {/*  =========popup bootstrap end==========  */}

            </div>
            <div className="hero-img">

                <div className="img-container">
                    <img src = {`https://gateway.pinata.cloud/ipfs/${cid}`} alt="profilePhoto" />
                </div>
            </div>
        </div>
    </section>
    )
}

export default Hero
