import React, { useState } from "react";

import BoxMarketplace from "@/components/BoxMarketplace";
import ButtonTopBar from "@/components/ButtonTopBar";
import Container from "@/components/Container";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import TopButtons from "@/components/TopButtons";
import WebhookList from "./webhook/listagem";

const buttons = [];

export default function IntegrationsPage() {
    const [filterButton, setFilterButton] = useState("");
    const [modalActive, setModalActive] = useState(false);
    return (
        <div className="flex items-start justify-start">
            <Sidebar />
            <Container>
                <TopBar notRegistered pageTitle="Integrações" />

                <TopButtons >
                    {buttons.map((button, index) => (
                        <ButtonTopBar
                            key={index}
                            nameButton={button.title}
                            filterButton={filterButton}
                            filterCondition={button.typeFilter}
                            handleFilterButton={() =>
                                filterButton !== button.typeFilter
                                    ? setFilterButton(button.typeFilter)
                                    : setFilterButton("")
                            }
                        />
                    ))}
                </TopButtons>

                <section className="flex items-center justify-center flex-col pb-8 sm:grid sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 px-6">
                    <BoxMarketplace
                        handleModal={()=>{setModalActive(true)}}
                        pluginDescription="Plugin disponível"
                        image="/images/marketplace.png"
                        imageAlt="Representation Marketplace"
                        title="Webhook"
                        description="Integre seu sistema de forma simples e eficiente com Webhooks: Receba notificações diretamente no seu aplicativo e mantenha-se atualizado em tempo real."
                    />
                  
                </section>
            </Container>
            <WebhookList modalActive={modalActive} setModalActive={setModalActive} />
        </div>
    );
}
