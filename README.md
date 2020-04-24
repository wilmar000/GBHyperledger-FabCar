docker exec -it cli bash

docker logs -f peer0.org1.example.com
peer chaincode list --installed
peer chaincode list --instantiated -C mychannel 

peer chaincode install -l node -n marketplace -v 1 -p /opt/gopath/src/github.com/chaincode/marketplace/javascript/

peer chaincode instantiate -o orderer.example.com:7050 --tls $CORE_PEER_TLS_ENABLED --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n marketplace -v 1 -c '{"Args":["initLedger"]}' -P "OR ('Org1MSP.member','Org2MSP.member')"

peer chaincode invoke -o orderer.example.com:7050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n marketplace -c '{"function":"queryAllItems","Args":[]}'

peer chaincode invoke -o orderer.example.com:7050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n marketplace -c '{"function":"queryItem","Args":["ITEM0"]}'

peer chaincode invoke -o orderer.example.com:7050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n marketplace -c '{"function":"changeItemOwner","Args":["ITEM9","Wilmar"]}'

peer chaincode invoke -o orderer.example.com:7050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n marketplace -c '{"function":"createItem","Args":["ITEM9","55 Mill St, Toronto, ON M5A 3C4","0xDA22AFAdB99bB7115edC57cfe83c35E320743733","olive oil","Vitalik Buterin"]}'
