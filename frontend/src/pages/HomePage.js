import React from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import MIS from '../IMG/MIS.png';
import Concept from '../IMG/Concept.png';
import Cover from '../IMG/Cover.jpg';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

function Home() {

    const navigate = useNavigate();

    return (

        <Box sx={{ p: 7, width: '96vw' }} >
            <Toolbar />
            <Box
                sx={{
                    p: 6,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: '1px 2px 9px #909090',
                    display: 'flex',
                    flexGrow: 1,
                    flexDirection: 'column',
                    alignContent: 'center',
                }}
            >

                {/* <Box sx={{ mb: 6 }}>
                    <Divider sx={{
                        "&::before, &::after": {
                            borderColor: '#003060',
                        },
                    }}>
                        <Typography variant="h3" sx={{ color: '#003060' }}>  HOME  </Typography>
                    </Divider>
                </Box> */}

                {/* Banner */}
                {/* <img src={Cover} alt='Cover' style={{ width: '100%' }} /> */}

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center',
                }}>
                    <Typography variant="h1" gutterBottom sx={{ color: '#003060', textAlign: 'center' }}>
                        Build the Future of Identity
                    </Typography>
                    <Typography variant="h4" gutterBottom sx={{ color: '#003060', textAlign: 'center' }}>
                        您的自主身分管理小幫手，協助使用者發布、管理及驗證憑證，<br />
                        輕鬆做到身分自主管理，使生活變得更加便利
                    </Typography>
                    <Box sx={{ display: 'flex', m: 2 }}>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{ fontSize: '25px', margin: 'auto', bgcolor: '#003060' }}
                            onClick={() => { navigate("/Holder") }}>
                            開始探索
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ mt: 3, display: 'flex', }}>
                    <iframe
                        style={{ margin: 'auto' }}
                        width="750"
                        height="450"
                        src="https://www.youtube.com/embed/AM2YB9qHrOc"
                        title="趣錢包 Chill Wallet"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
                </Box>
                <Box sx={{ mt: 8, pl: 7, pr: 7 }}>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ p: 1 }}>
                                <Typography variant="h4" sx={{ color: '#003060', fontWeight: 'bold' }}> 關於我們</Typography>
                                <Typography variant="subtitle1" sx={{ fontSize: '20px' }}>
                                    大家好，我們是來自國立政治大學資管系的學生，此網站是我們畢業專題所架設的平台。
                                    本專題的目的在於藉由建立一個自主身份管理平台，實現憑證電子化、電子文件真實性驗證等目標。
                                    透過此平台，電子文件與憑證的發行者、持有者、驗證者三方可方便且有效率地進行部署、儲存、驗證等功能。
                                    我們希望透過以太坊區塊鏈的技術，協助使用者進行憑證的發行與管理，讓使用者不需經過繁瑣的程序與花費大量時間，即可以滿足憑證的呈現、驗證等需求。
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex' }}>
                                <img src={MIS} alt='MIS' width={370} height={400} style={{ margin: 'auto' }} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Typography variant="h4" sx={{ color: '#003060', fontWeight: 'bold' }}> 平台特色</Typography>
                            <Typography variant="subtitle1" sx={{ fontSize: '20px' }}>
                                使用以太坊區塊鏈的技術，並遵循W3C的規範，設計一個以Ethereum為環境的可驗證憑證機制，其中特色包括：
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Box sx={{ display: 'flex', width: '100%', height: "100%", mb: 9 }}>
                                <img src={Concept} alt='Concept' style={{ margin: 'auto' }} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card sx={{ minWidth: 275, width: 350, m: 'auto', boxShadow: '1px 2px 9px #909090' }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Holder
                                    </Typography>
                                    <Box sx={{ height: 70 }}>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            擁有可驗證憑證，並可選擇性遮罩憑證內容，向Verifier出示憑證的角色。比如個人或企業。
                                        </Typography>
                                    </Box>
                                    <Box sx={{ height: 330 }}>
                                        <Typography variant="body2">
                                            <List sx={{
                                                listStyleType: 'disc',
                                                pl: 2,
                                            }}>
                                                <ListItem sx={{ display: 'list-item' }} >
                                                    自主性
                                                    <ListItemText>
                                                        憑證所有權完全屬於持有者，可以自己主張身份，不再被權威機構掌控。
                                                    </ListItemText>
                                                </ListItem>
                                                <ListItem sx={{ display: 'list-item' }} >
                                                    隱私保護
                                                    <ListItemText>
                                                        持有者可進行選擇性披露，自行決定憑證要共享的資訊。
                                                    </ListItemText>
                                                </ListItem>
                                                <ListItem sx={{ display: 'list-item' }} >
                                                    憑證錢包
                                                    <ListItemText>
                                                        協助管理自己的憑證，避免憑證丟失。
                                                    </ListItemText>
                                                </ListItem>
                                            </List>
                                        </Typography>
                                    </Box>
                                </CardContent>
                                {/* <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions> */}
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card sx={{ minWidth: 275, width: 350, m: 'auto', boxShadow: '1px 2px 9px #909090' }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Issuer
                                    </Typography>
                                    <Box sx={{ height: 70 }}>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            創建可驗證憑證，並傳送給憑證所有者的角色。比如政府、機構等組織。
                                        </Typography>
                                    </Box>
                                    <Box sx={{ height: 330 }}>
                                        <Typography variant="body2">
                                            <List sx={{
                                                listStyleType: 'disc',
                                                pl: 2,
                                            }}>
                                                <ListItem sx={{ display: 'list-item' }} >
                                                    降低成本
                                                    <ListItemText>
                                                        降低紙張成本，達成憑證數位化。
                                                    </ListItemText>
                                                </ListItem>
                                                <ListItem sx={{ display: 'list-item' }} >
                                                    方便好上手
                                                    <ListItemText>
                                                        透過平台，三步驟輕鬆發佈數位憑證。
                                                    </ListItemText>
                                                </ListItem>
                                            </List>
                                        </Typography>
                                        <Box sx={{ width: '100%', height: 150, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                            <AccountBalanceIcon sx={{ fontSize: 150, color: "#E1E1E1" }} />
                                        </Box>
                                    </Box>
                                </CardContent>
                                {/* <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions> */}
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card sx={{ minWidth: 275, width: 350, m: 'auto', boxShadow: '1px 2px 9px #909090' }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Verifier
                                    </Typography>
                                    <Box sx={{ height: 70 }}>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            驗證憑證的角色。可透過平台一鍵上傳驗證。
                                        </Typography>
                                    </Box>
                                    <Box sx={{ height: 330 }}>
                                        <Typography variant="body2">
                                            <List sx={{
                                                listStyleType: 'disc',
                                                pl: 2,
                                            }}>
                                                <ListItem sx={{ display: 'list-item' }} >
                                                    獨立驗證
                                                    <ListItemText>
                                                        憑證內容與發放機構皆公開可驗，可自行完成驗證。
                                                    </ListItemText>
                                                </ListItem>
                                                <ListItem sx={{ display: 'list-item' }} >
                                                    不可篡改性
                                                    <ListItemText>
                                                        透過區塊鏈、加密算法等，保證憑證資訊的不被篡改。
                                                    </ListItemText>
                                                </ListItem>
                                            </List>
                                        </Typography>
                                        <Box sx={{ width: '100%', height: 150, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                            <AssignmentTurnedInIcon sx={{ fontSize: 150, color: "#E1E1E1" }} />
                                        </Box>
                                    </Box>
                                </CardContent>
                                {/* <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions> */}
                            </Card>
                        </Grid>
                        {/* <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', width: '100%', height: "100%" }}>
                                <img src={Concept} alt='Concept' width={400} height={280} style={{ margin: 'auto' }} />
                            </Box>
                        </Grid> */}
                        {/* <Grid item xs={12} md={6}>
                            <Box sx={{ p: 1 }}>
                                <Typography variant="h4" sx={{ color: '#003060', fontWeight: 'bold' }}> 平台特色</Typography>
                                <Typography variant="subtitle1" sx={{ fontSize: '20px' }}>
                                    使用以太坊區塊鏈的技術，並遵循W3C的規範，設計一個以Ethereum為環境的可驗證憑證機制，其中特色包括：
                                    <List sx={{
                                        listStyleType: 'disc',
                                        pl: 2,
                                    }}>
                                        <ListItem sx={{ display: 'list-item' }} >
                                            可驗證憑證 （Verifiable Credential, 簡稱VC）
                                            <ListItemText>
                                                可驗證憑證是由W3C提出的一套數位憑證協議，W3C希望能透過數位簽章等防竄改技術，讓可驗證憑證可以更被人信賴。<br /><br />
                                                可驗證憑證模型中包含三類角色：<br /><br />
                                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <div>Holder：</div><div>擁有可驗證憑證，並可選擇性遮罩憑證內容，向Verifier出示憑證的角色。比如個人或企業。</div>
                                                </div>
                                                <br />
                                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <div>Issuer：</div><div>創建可驗證憑證，並傳送給憑證所有者的角色。比如政府、機構等組織。</div>
                                                </div>
                                                <br />
                                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <div>Verifier：</div><div>驗證憑證的角色。</div>
                                                </div>
                                            </ListItemText>
                                        </ListItem>
                                        <ListItem sx={{ display: 'list-item' }}>
                                            去中心化身分識別碼（Decentralized Identifiers, 簡稱DIDs）
                                            <ListItemText>
                                                去中心化身分指的是一個人的身分識別碼並非透過政府等權威機構發布和控制，而是個人或組織透過系統生成識別碼，並使用數位簽章等加密證明方式來證明其所有權。
                                                由於DID是可以隨意生成和主張的，因此需要各種可驗證憑證（VC）來讓DID與個人的實體產生連結，以此證明個人實體的身分。
                                            </ListItemText>
                                        </ListItem>
                                    </List>
                                </Typography>
                            </Box>
                        </Grid> */}
                    </Grid>
                </Box>
            </Box>
        </Box>

    );
}
export default Home;