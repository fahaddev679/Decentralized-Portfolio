import React, {useEffect, useState} from 'react'
import { FaDonate } from 'react-icons/fa';
import { Modal, ModalHeader, ModalBody, Row, Button } from "reactstrap"
import img from "../../assets/img1.png"
import "./Projects.css"

const Projects = ({state}) => {
    const [modal, setModal] = useState(false);
    const [projects, setProjects] = useState("");

    useEffect(()=>{
        const {contract} = state;
        //console.log(contract);
        const projectDetails = async()=>{
            const projects = await contract.methods.allProject().call();
            setProjects(projects);
        }
        contract && projectDetails();
    }, [state]);

    const donateEth = async(event)=>{
        event.preventDefault();
        try{
            const {contract, web3} = state;
            const eth = document.querySelector("#eth").value;
            const toWei = web3.utils.toWei(eth, "ethers");
            const accounts = await web3.eth.getAccounts();
            await contract.methods.donate().send({from:accounts[0], value:toWei, gas: 480000});
            alert("Transaction successful");

        }catch(error){
            alert('Transaction not successful');
        }
    }

    //src = `https://gateway.pinata.cloud/ipfs/${project.image}`
    //const githubLink = `https://github.com/fahaddev679/${project.githubLink}`;
    return (
        <section className="project-section">
            <h1 className="title">Projects </h1>
            <div className="card-wrapper">
                 {projects !== "" && projects.map((project)=>{
                    
                    return ( <a href= "#" className="project-card" target='_blank' rel="noopener noreferrer" >
                    <div className="card-img">
                        <img src= "" alt="" /></div>
                        
                    <div className="card-text">
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                    </div>
                </a>)
                })} 
           
            </div>
 {/*  =========popup bootstrap==========  */}

 <Modal size='md' isOpen={modal} toggle={() => setModal(!modal)}>
                        <ModalHeader toggle={() => setModal(!modal)}>
                            Enter the ETH you want to donate!
                        </ModalHeader>
                        <ModalBody>
                            <form onSubmit={donateEth}>
                                <Row>
                                    <input id="eth" type="text" />
                                        <Button className='mt-4' >
                                            Send
                                        </Button>
                                </Row>
                            </form>
                        </ModalBody>
                    </Modal>
                    {/*  =========popup bootstrap end==========  */}
                    {/*<p className='donate' onClick={() => setModal(true)}>Liked these projects ? Consider donating Eth's <FaDonate className='icon' /></p>*/}
        </section>
    )
}

export default Projects
