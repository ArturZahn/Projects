import React, {useState, useEffect} from 'react';
import {Feather} from '@expo/vector-icons';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import s from './style.js';

export default function Incidents()
{
    const Navigation = useNavigation();
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    function navigateToDetail(incident)
    {
        Navigation.navigate('Detail', {incident});
    }

    async function loadIncidents()
    {
        if (loading) return;

        if(total > 0 && incidents.length == total) return;

        setLoading(true);

        const response = await api.get('/incidents', {params: {page}});
        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => { loadIncidents(); }, []);

    return (
        <View style={s.container}>
            <View style={s.header}>
                <Image source={logoImg} />
                <Text style={s.headerText}>
                    Total de <Text style={s.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={s.title}>Bem Vindo!</Text>
            <Text style={s.description}>Escolha um dos casos abaixo e salve o dia.</Text>


            <FlatList 
                data = {incidents}
                style={s.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold = {1}
                renderItem={({item: incident}) => (

                    <View style={s.incident}>
                        <Text style={s.incidentProperty}>ONG:</Text>
                        <Text style={s.incidentValue}>{incident.name}</Text>
                        
                        <Text style={s.incidentProperty}>Caso:</Text>
                        <Text style={s.incidentValue}>{incident.title}</Text>
                        
                        <Text style={s.incidentProperty}>Valor:</Text>
                        <Text style={s.incidentValue}>
                            {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}
                        </Text>

                        <TouchableOpacity style={s.detailsButton} onPress={() => navigateToDetail(incident)}>
                            <Text style={s.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name='arrow-right' size={16} color='#e02041'></Feather>
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    );
}
