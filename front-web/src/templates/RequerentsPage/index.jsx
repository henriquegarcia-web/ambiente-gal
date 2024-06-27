import React, { useState } from "react";

import BoxMarketplace from "@/components/BoxMarketplace";
import ButtonTopBar from "@/components/ButtonTopBar";
import Container from "@/components/Container";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import TopButtons from "@/components/TopButtons";

const buttons = [{ title: "Filtros", typeFilter: "exemplo1" }];

export default function RequerentsPage() {
    const [filterButton, setFilterButton] = useState("");

    return (
        <div className="flex items-start justify-start">
            <Sidebar />
            <Container>
                <TopBar pageTitle="Requerentes" notRegistered />

                <TopButtons search>
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
                        plugin
                        pluginAvailable
                        pluginDescription="Plugin disponível"
                        image="/images/marketplace.png"
                        imageAlt="Representation Marketplace"
                        title="The Scrapper"
                        description="A shrouded mutant hands existing in the approximate future"
                    />
                    <BoxMarketplace
                        plugin
                        pluginDescription="Plugin instalado"
                        image="/images/marketplace.png"
                        imageAlt="Representation Marketplace"
                        title="The Scrapper"
                        description="A shrouded mutant hands existing in the approximate future"
                    />
                </section>
            </Container>
        </div>
    );
}
