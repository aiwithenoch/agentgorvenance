from setuptools import setup, find_packages

setup(
    name="agentgovernance",
    version="0.2.0",
    description="The Omni-Continental Governance Framework and Absolute Protector Engine for AI Agents.",
    author="Enoch",
    author_email="aiwithenoch@gmail.com",
    url="https://github.com/aiwithenoch/agentgorvenance",
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        "schedule>=1.2.0"
    ],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.8',
)
