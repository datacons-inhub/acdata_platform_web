import React from 'react';
import CPanelBody from '../cbody';
import imgFirebase from '@assets/images/cpanel/data/firebase.png';

import { DataCardWrapper, IntegrationCard, IntegrationButton } from './DataConnectionView.styles';


const DataConnectionView: React.FC = () => {
    return (
    <CPanelBody>
        <DataCardWrapper>
            <h2>Explore our built-in integrations and connection guides</h2>
            <div className="integration-cards">
                {dataSources.map((source) => (
                    <IntegrationCard key={source.name}>
                        <img src={source.icon} alt={`${source.name} icon`} />
                        <div className="details">
                            <h3>{source.name}</h3>
                            <div className="actions">
                                <IntegrationButton variant="read">Upload</IntegrationButton>
                                
                            </div>
                        </div>
                    </IntegrationCard>
                ))}
            </div>
        </DataCardWrapper>
    </CPanelBody>
    );
};


const dataSources = [
    { name: 'CSV / Json ', icon: imgFirebase },
    //{ name: 'Firebase', icon: 'path/to/firebase-icon.png' },
    { name: 'Firebase', icon: imgFirebase },
    { name: 'Firebase', icon: imgFirebase },
    { name: 'Firebase', icon: imgFirebase },
    { name: 'Firebase', icon: imgFirebase },
    { name: 'Firebase', icon: imgFirebase },
    
    // Agregar más fuentes de datos aquí
];
export default DataConnectionView;
