import styled, { createGlobalStyle } from "styled-components/macro";

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: white;
        margin: 0px;
        font-family:'Roboto', sans-serif;
        font-weight: 300;
    }
    .view-wrapper {
        padding: 25px;
    }
    button {
        display:inline-block;
        padding:0.35em 1.2em;
        border:0.1em solid #000;
        margin:0 0.3em 0.3em 0;
        border-radius:0.12em;
        box-sizing: border-box;
        text-decoration:none;
        color: grey;
        text-align:center;
        transition: all 0.2s;
        }
    button:hover{
        color:#000000;
        background-color: lightgrey;
        transition: 0.2s;
    }
    a {
        text-decoration: none;
        color: darkblue;
    }
    .bloglist-wrapper {
        .bloglist {
            display: flex;
            flex-direction: column;
            > div {
                padding: 10px;
                background-color: lightgrey;
                border: 2px solid grey;
            }
        }
    }
    .blogview-wrapper {
        .blogview {

        }
        .blogcomments {
            form {
                display: flex;
                flex-direction: column;
                button {
                    align-self: flex-start;
                    margin-top: 10px;
                    width: 75px;
                    height: 25px;
                }
                textarea {
                    resize: none;
                    height: 100px;
                    width: 300px;
                }
            }
            ul {
                list-style-type: none;
                padding: 0;
            }
            li {
                padding: 10px;
                border-bottom: 1px solid lightgrey;
            }
        }
    }
    .userlist-wrapper {
        table {
            border-spacing:0;
        }
        th {
            text-align: left;
            padding-bottom: 10px;
        }
        td {
            padding: 10px;
            width: 150px;
            border: 1px solid grey;
            background-color: lightgrey;
        }
    }
    .userdetail {
        ul {
                list-style-type: none;
                padding: 0;
            }
            li {
                padding: 10px;
                border-bottom: 1px solid lightgrey;
            }
    }
`;

export const NavBar = styled.div`
	display: flex;
	background-color: lightgrey;
	padding: 10px;
	.nav-link {
		margin: 5px;
		color: white;
		text-decoration: none;
		align-self: center;
	}
	.nav-link:hover {
		text-decoration: underline;
	}
	.nav-user {
		margin: 5px;
		color: grey;
		margin-left: auto;
	}
`;
