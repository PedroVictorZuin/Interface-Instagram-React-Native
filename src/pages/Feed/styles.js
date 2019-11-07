import styled from 'styled-components/native'


export const Post  = styled.View`
margin-top:20px;
`;


export const Name  = styled.Text`
margin-top:20px;
color: #333;
font-weight : bold;
`;

export const Header  = styled.View`
padding : 15px;
flex-direction : row;
align-items : center;
`;

export const Avatar  = styled.Image`
width : 32px;
height: 32px;
border-radius: 16px;
margin-right:10px;
`;

export const Description  = styled.Text`
padding : 10px;
line-height : 18px;

`;

export const Loading = styled.ActivityIndicator.attrs({
size : "small",
color: "#999",

})`
`;