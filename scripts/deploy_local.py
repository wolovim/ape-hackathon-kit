import click
import json
from ape.cli import NetworkBoundCommand, network_option
from ape import project, accounts


@click.command(cls=NetworkBoundCommand)
@network_option()
def cli(network):
    if "foundry" not in network:
        raise click.ClickException("This script is only for the foundry network")

    # set up accounts
    user1 = accounts.test_accounts[0]

    # deploy the contract
    billboard_contract = user1.deploy(project.Billboard, "gm", user1.address)
    print("Billboard contract address: ", billboard_contract.address)

    # parse the ABI
    billboard_contract_abi = json.loads(billboard_contract.contract_type.json())["abi"]

    with open("./webapp/.env.local", "w") as f:
        # NEXT_PUBLIC_ variables are usable in the client application
        f.write(f'NEXT_PUBLIC_CONTRACT_ADDRESS="{billboard_contract.address}"\n')
        f.write(f'NEXT_PUBLIC_CONTRACT_ABI="{json.dumps(billboard_contract_abi)}"')
