import pytest


@pytest.fixture
def acct1(accounts):
    return accounts[0]


@pytest.fixture
def acct2(accounts):
    return accounts[1]


@pytest.fixture
def acct3(accounts):
    return accounts[2]


@pytest.fixture
def contract_billboard(acct1, project):
    return acct1.deploy(project.Billboard, "gm", acct1.address)
