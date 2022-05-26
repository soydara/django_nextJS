import React, {useState} from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
// import {FaCheckCircle} from "react-icons/fa";
import styles from "../styles/Detail.module.css";
import getAllSlugs from '../utils/getAllSlugs';
import getCampaignBySlug from '../utils/getCampaignBySlug';
import * as gtag from '../lib/gtag'


function Campaign({data}) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState("");

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const options = {
            method: "POST",
            body: JSON.stringify({
                email,
                campaign: data.id,
            }),

            headers: {
                "Content-Type": "application/json",
            },
        };

        setIsSubmitting(true);
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/subscribers`, options)
            .then((res) => res.json())
            .then((response) => {
                setIsSubmitted(true);

                gtag.event({
                    action: 'submit_form',
                    category: 'Contact',
                    label: email,
                })
            })
            .catch((error) => console.log(`error`, error))
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div>
            <Head>
                <title>{data.title}</title>
                <meta name="description" content={data.description}/>
            </Head>

            <div className={styles.wrapper}>
                <div className={styles.main}></div>
                <div className={styles.contents}>
                    <Image
                        height={124}
                        width={124}
                        className={styles.img}
                        src={"https://res.cloudinary.com/dgapdhvth/" + data.logo}
                        alt="app logo"
                    />

                    <div className={styles.grid}>
                        <div className={styles.left}>
                            <h1 className={styles.title}>{data.title}</h1>
                            <p className={styles.description}>{data.description}</p>
                        </div>

                        <div className={styles.right}>
                            {isSubmitted && (
                                <div
                                    style={{
                                        height: "100px",
                                        width: "100%",
                                        textAlign: "center",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: "white",
                                        // borderRadius: 4,
                                    }}
                                >
                                    <div style={{marginTop: "3px"}}>
                                        {" "}
                                        <FaCheckCircle size={17} color="green"/>
                                    </div>
                                    <p style={{color: "green", marginLeft: 6}}>
                                        Thank you for your subscription
                                    </p>
                                </div>
                            )}
                            {!isSubmitted && (
                                <div className={styles.rightContents}>
                                    <form onSubmit={handleOnSubmit}>
                                        <div className={styles.formGroup}>
                                            <input
                                                type="email"
                                                required
                                                name="email"
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                }}
                                                value={email}
                                                placeholder="Email address"
                                                className={styles.input}
                                            />

                                        </div>
                                        <div className={styles.submit}>
                                            <input
                                                value={submitting ? "CONFIRMING" : "SUBSCRIBE"}
                                                className={styles.button}
                                                type="submit"
                                                disabled={submitting}
                                            />

                                            <p className={styles.consent}>
                                                We respect your privacy. Unsubscribe at any time.
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            )}{" "}
                        </div>
                    </div>
                </div>
                <footer className={styles.footer}>
                    <Link href="/">
                        <a>Go back to main list</a>
                    </Link>
                </footer>
            </div>
        </div>
    );
}

export async function getStaticPaths() {
    const paths = await getAllSlugs();

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({params}) {
    const data = await getCampaignBySlug(params.slug);

    return {
        props: {
            data,
        },
    };
}


export default Campaign;