import {useEffect , useState , useCallback} from 'react';
import {Image , View , FlatList} from 'react-native'
import logo from '../../assets/instagram.png'
import React from 'react'


import LazyImage from '../../components/Lazyimage'


import {Post , Name , Avatar ,  Header  , Description, Loading } from './styles'
 


export default function Feed() {

    const [posts , setFeed] = useState([])
    const [page , setPage] = useState(1)
    const [total , setTotal] = useState(0)
    const [loading , setLoading] = useState(false);
    const [refresh , setRefresh] = useState(false);
    const [viewable , setViewable] = useState([])



    async function loadPage(pageNumber = page , shouldRefresh = false){

        if (total && pageNumber > total)return;

        setLoading(true)

        const response = await fetch(`http://localhost:3000/feed?_expand=author&_limit=5&_page=${pageNumber}`)
        const data = await response.json()
        const totalItens =  response.headers.get("X-Total-Count")

        setTotal(Math.floor(totalItens / 5))

        setFeed(shouldRefresh ? data : [...posts, ...data])
        setPage(pageNumber + 1)
        setLoading(false)
    }

async function refreshList(){
    setRefresh(true)

        await loadPage(1 , true)

    setRefresh(false)
}


    useEffect(()=>{
         

        loadPage()

    } , [])


    const handleViewableChanged = useCallback(({changed})=>{

        setViewable(changed.map(({item})=> item.id ))

    },[])

    return(
        <View>
           <FlatList
           data={posts}
           onViewableItemsChanged={handleViewableChanged}
           keyExtractor={post => String(post.id)}
           onEndReached={()=>{loadPage()}}
           onEndReachedThreshold={0.1}
           onRefresh={refreshList}
           refreshing = {refresh}
           viewabilityConfig = {{viewAreaCoveragePercentThreshold : 20}}
           ListFooterComponent={loading && <Loading/>}
           renderItem = {({item})=>(
               <Post>
                <Header>
                    <Avatar source={{uri : item.author.avatar}} /><Name>{item.author.name}</Name>
                </Header>

                <LazyImage 
                shouldLoad = {viewable.includes}
                aspectRatio={item.aspectRatio}
                source={{uri : item.image}} 
                smallSource={{uri : item.small}}
                />

                <Description>
                    <Name>{item.author.name}</Name> {item.description}

                </Description>
               </Post>
           )}
           />

           
        </View>
    )
}