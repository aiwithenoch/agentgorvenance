from setuptools import setup, find_packages

setup(
    name="agentgovernance",
    version="0.1.0",
    description="A centralized governance framework and compliance engine for AI agents.",
    author="Enoch",
    author_email="aiwithenoch@gmail.com",
    url="https://github.com/aiwithenoch/agentgorvenance",
    packages=find_packages(),
    include_package_data=True,
    install_requires=[],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.8',
)
